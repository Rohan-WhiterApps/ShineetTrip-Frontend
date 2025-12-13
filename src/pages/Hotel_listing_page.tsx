"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Star,
  Check,
  MapPin,
  Users,
  Calendar,
  Search,
  SlidersHorizontal,
  X, 
  Wifi,
} from "lucide-react";

interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewsCount: number;
  images: string[];
  amenities: string[];
  price: number;
  originalPrice: number;
  taxes: number;
  description: string;
}

// Helper to format date to YYYY-MM-DD for input value/default
const getTodayDateString = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const HotelListingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // ✅ Editable States
  const [currentLocation, setCurrentLocation] = useState(
    searchParams.get("location") || "" 
  );
  const [currentCheckIn, setCurrentCheckIn] = useState(
    searchParams.get("checkIn") || getTodayDateString()
  );
  const [currentCheckOut, setCurrentCheckOut] = useState(
    searchParams.get("checkOut") || getTodayDateString()
  );
  const [currentAdults, setCurrentAdults] = useState(
    searchParams.get("adults") || "2"
  );
  const [currentChildren, setCurrentChildren] = useState(
    searchParams.get("children") || "0"
  );

  const [sortBy, setSortBy] = useState("Most Popular");
  const [selectedImages, setSelectedImages] = useState<{ [key: number]: number }>({});
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  // API Fetch parameters
  const location = searchParams.get("location") || "";
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const adults = searchParams.get("adults") || "2";
  const children = searchParams.get("children") || "0";

  const sortOptions = [
    "Most Popular",
    "Price- Low to high",
    "Price- High to low",
    "Best Rated",
    "Lowest Price & Best Rated",
  ];

  // ✅ Function to handle navigation with new search parameters
  const handleSearch = () => {
    setFetchError(null);

    const today = getTodayDateString();
    if (currentCheckIn < today) {
      alert("Check-in date cannot be in the past. Please select today or a future date.");
      return;
    }
   
    if (currentCheckOut <= currentCheckIn) {
        alert("Check-out date must be after Check-in date.");
        return;
    }

    const newSearchParams = new URLSearchParams({
      location: currentLocation,
      checkIn: currentCheckIn,
      checkOut: currentCheckOut,
      adults: currentAdults,
      children: currentChildren,
    }).toString();

    navigate(`/hotellists?${newSearchParams}`);
  };

  // ✅ Fetching logic
  const fetchHotels = useCallback(async () => {
    setLoading(true);
    setFetchError(null);

    try {
      const token = localStorage.getItem("shineetrip_token");
      if (!token) {
        console.warn("No token found — please log in first.");
        setLoading(false);
        setHasSearched(true);
        return;
      }

      const queryParams = new URLSearchParams();
      if (location) queryParams.append("location", location); 
      if (checkIn) queryParams.append("checkIn", checkIn);
      if (checkOut) queryParams.append("checkOut", checkOut);
      if (adults) queryParams.append("adults", adults);
      if (children) queryParams.append("children", children);

      const apiUrl = `http://46.62.160.188:3000/search/hotels?${queryParams.toString()}`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        // Error handling logic remains the same...
        const errorText = await response.text();
        try {
          const errorData = JSON.parse(errorText);
          setFetchError(errorData.message || `Failed to fetch hotels: ${response.status}`);
        } catch {
          setFetchError(`Failed to fetch hotels: ${response.status}`);
        }
        throw new Error(`Failed to fetch hotels: ${response.status} ${errorText}`);
      }

      const data = await response.json();

      // FIX 1: Map function is now generating an array of Promises for parallel fetching
      const hotelPromises = (Array.isArray(data) ? data : [])
        .map(async (item: any) => { 
          const hotel = item.property;
          const roomDetails = item.roomDetails;

          if (!hotel) return null;
          
          // --- Fetch Dynamic Reviews Data (Individual Hotel) ---
          // Note: hotel.id is used as propertyId
          const summaryUrl = `http://46.62.160.188:3000/ratings/average/summary?propertyId=${hotel.id}`;
          let reviewsCount = 0; // Default to 0 
          let avgRating = parseFloat(hotel.rating) || 4.2; // Use API rating first
          
          try {
              const reviewResponse = await fetch(summaryUrl, { 
                  headers: { 'Authorization': `Bearer ${token}` } 
              });

              if (reviewResponse.ok) {
                  const reviewData = await reviewResponse.json();
                  if (reviewData) {
                      reviewsCount = parseInt(reviewData.totalReviews, 10) || 0; 
                      // FIX 2: Use fetched average rating if available
                      avgRating = parseFloat(reviewData.averageRating) || avgRating; 
                  }
              }
          } catch (e) {
              console.error(`Failed to fetch reviews for hotel ${hotel.id}:`, e);
          }
          
          return {
            id: String(hotel.id),
            name: hotel.name || "",
            location: `${hotel.city || ""}, ${hotel.country || ""}`.trim(),
            // FIX 2: Correctly use the dynamically calculated avgRating
            rating: avgRating, 
            reviewsCount: reviewsCount, // Correctly using the dynamic count
            images:
              hotel.images
                ?.map((img: any) => img.image)
                .filter((url: string | null) => url && typeof url === "string") || [],
            amenities: hotel.selectedFeatures?.map((f: any) => f.name) || ["Gym", "Restaurant"],
            price: parseFloat(roomDetails?.retailPrice || 8999),
            originalPrice: parseFloat(roomDetails?.totalPricePerNight || 8999),
            taxes: parseFloat(roomDetails?.taxAmount || 144),
            description: hotel.short_description || hotel.description || "",
          };
        });
      
      // FIX 1: Wait for all Promises to resolve (all hotel and review fetches)
      const resolvedHotelList = await Promise.all(hotelPromises); 

      const finalHotelList = resolvedHotelList.filter((item): item is Hotel => item !== null);

      setHotels(finalHotelList);

      // Initialize selected images
      const initialImages: { [key: number]: number } = {};
      finalHotelList.forEach((_: any, index: number) => { // Use finalHotelList for correct index
        initialImages[index] = 0;
      });
      setSelectedImages(initialImages);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
      setLoading(false);
      setHasSearched(true);
    }
  }, [location, checkIn, checkOut, adults, children, navigate]);


  // UI Rendering ke pehle, total reviews calculate karein
  // FIX 1: Variable definition moved here
  const totalReviewsCount = hotels.reduce((sum, hotel) => sum + hotel.reviewsCount, 0); 
  
  // API fetch triggers when URL params change
  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  // --------------------------------------------------
// Sorting Logic Effect
// --------------------------------------------------
useEffect(() => {
  if (!hotels.length) return;

  let sorted = [...hotels];

  switch (sortBy) {
    case "Price- Low to high":
      sorted.sort((a, b) => a.price - b.price);
      break;

    case "Price- High to low":
      sorted.sort((a, b) => b.price - a.price);
      break;

    case "Best Rated":
      sorted.sort((a, b) => b.rating - a.rating);
      break;

    case "Lowest Price & Best Rated":
      sorted.sort((a, b) => {
        if (a.price === b.price) return b.rating - a.rating;
        return a.price - b.price;
      });
      break;

    default:
      break;
  }

  setHotels(sorted);
}, [sortBy]);


  // Sync internal states when URL changes
  useEffect(() => {
    // ✅ FIX 3: Removed hardcoded "Manali" default from URL sync
    setCurrentLocation(searchParams.get("location") || "");
    setCurrentCheckIn(searchParams.get("checkIn") || getTodayDateString());
    setCurrentCheckOut(searchParams.get("checkOut") || getTodayDateString());
    setCurrentAdults(searchParams.get("adults") || "2");
    setCurrentChildren(searchParams.get("children") || "0");
  }, [searchParams]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleImageSelect = (hotelIndex: number, imageIndex: number) => {
    setSelectedImages((prev) => ({
      ...prev,
      [hotelIndex]: imageIndex,
    }));
  };

  const handleHotelClick = (hotelId: string) => {
    const currentSearchParams = searchParams.toString();
    navigate(`/room-booking/${hotelId}?${currentSearchParams}`);
  };
  
  // ===============================================
  // START NEW LOGIC BLOCK FOR VIEW ALL FIX
  // ===============================================
  
  // Helper to check if location is currently empty or not
  const isLocationEmpty = currentLocation.trim() === "";
  
  // Function to navigate to View All Hotels (No location filter)
  const handleViewAllHotels = () => {
    // Server ko satisfy karne ke liye safe dates bhejte hain
    const safeCheckIn = getTodayDateString(); 
    const safeCheckOut = getTodayDateString(); 

    const searchQuery = new URLSearchParams({
        location: '', 
        checkIn: safeCheckIn,
        checkOut: safeCheckOut,
        adults: currentAdults,
        children: currentChildren,
    }).toString();
    
    // Navigate to the listing page with safe defaults
    navigate(`/hotellists?${searchQuery}`);
  };


  const handleSearchClick = () => {
    const token = localStorage.getItem("shineetrip_token");
    if (!token) {
        alert("Please log in to search for hotels.");
        return;
    }

    // Agar location khali hai, toh View All logic chalao
    if (isLocationEmpty) {
        handleViewAllHotels();
    } else {
        // Agar location filled hai, toh detailed search chalao (handleSearch)
        handleSearch();
    }
  };
  // ===============================================
  // END NEW LOGIC BLOCK
  // ===============================================


const SearchBar = (
    <div className="bg-white border-b border-gray-200 pt-6 sticky top-[64px] sm:top-[90px] z-20 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        
        {/* Search Fields - FULLY RESPONSIVE */}
        <div className="
             flex flex-col sm:flex-row items-stretch sm:items-center 
             justify-center gap-0 mb-4 rounded-lg overflow-hidden 
             border border-gray-300 bg-gray-200
        ">
          
          {/* Location Field */}
          <div className="flex-1 w-full sm:max-w-[250px] bg-gray-200 px-4 py-3 border-b sm:border-r sm:border-b-0 border-gray-300">
            <div className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
              CITY, AREA OR PROPERTY
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D2A256]" />
              <input
                type="text"
                value={currentLocation}
                onChange={(e) => setCurrentLocation(e.target.value)}
                className="text-base font-medium text-gray-900 bg-transparent w-full focus:outline-none"
                placeholder="Enter location"
              />
            </div>
          </div>

          {/* Check-in Field */}
          <div className="flex-1 w-full sm:max-w-[200px] bg-gray-200 px-4 py-3 border-b sm:border-r sm:border-b-0 border-gray-300">
            <div className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">CHECK-IN</div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#D2A256]" />
              <input
                type="date"
                value={currentCheckIn}
                onChange={(e) => setCurrentCheckIn(e.target.value)}
                className="text-base font-medium text-gray-900 bg-transparent w-full focus:outline-none"
              />
            </div>
          </div>

          {/* Check-out Field */}
          <div className="flex-1 w-full sm:max-w-[200px] bg-gray-200 px-4 py-3 border-b sm:border-r sm:border-b-0 border-gray-300">
            <div className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">CHECK-OUT</div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#D2A256]" />
              <input
                type="date"
                value={currentCheckOut}
                onChange={(e) => setCurrentCheckOut(e.target.value)}
                className="text-base font-medium text-gray-900 bg-transparent w-full focus:outline-none"
              />
            </div>
          </div>

          {/* Room & Guest Field */}
          {/* Note: Isme right border sirf sm:screen par chahiye, mobile par nahi, isliye border-r hataya */}
          <div className="flex-1 w-full sm:max-w-[250px] bg-gray-200 px-4 py-3 sm:border-r-0 border-b-0 border-gray-300">
            <div className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">ROOM & GUEST</div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#D2A256]" />
              <span className="text-base font-medium text-gray-900">
                1 Room, {currentAdults} Adult{parseInt(currentAdults) > 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Search Button - Yellow/Gold color as in Figma */}
          <div className="flex-shrink-0 p-2">
            <button
              onClick={handleSearchClick}
              className="bg-[#D2A256] text-white p-3 rounded-full hover:bg-[#c2934b] transition-colors shadow-lg"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sort Options / Mobile Filter Toggle */}
        <div className="flex items-center justify-between flex-wrap mt-2">
          
          {/* 1. Sort Label (Desktop Only) */}
          <div className="hidden sm:flex items-center gap-2 text-gray-900 font-semibold text-sm">
            <SlidersHorizontal className="w-4 h-4 text-[#D2A256]" />
            <span>Sort By:</span>
          </div>

          {/* 2. Sort Options Buttons (Desktop Only) */}
          <div className="hidden sm:flex gap-3 flex-wrap">
            {sortOptions.map((option) => (
              <button
                key={option}
                onClick={() => setSortBy(option)}
                className={`px-3 py-1.5 rounded-full text-xs transition-all font-medium border ${
                  sortBy === option
                    ? "bg-[#D2A256] text-white border-[#D2A256]"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          
          {/* 3. Mobile Filter/Sort Button (Mobile Only) */}
          {/* Ye button Side Bar ko open karega */}
          <button
              onClick={() => setIsSideBarOpen(true)}
              className="sm:hidden flex items-center gap-2 px-4 py-2 bg-[#D2A256] text-white rounded-lg font-semibold"
          >
              <SlidersHorizontal className="w-4 h-4" />
              Sort & Filter
          </button>
          
        </div>
        
        {/* Temporary Button for Figma Style (Hata diya gaya hai jaisa aapne pichle response mein suggest kiya tha) */}
      </div>
    </div>
);


  // --- Rendering UI ---

  // Handle Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 font-opensans pt-[116px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Searching for properties...</p>
        </div>
      </div>
    );
  }
  
  // FIX 1: totalReviewsCount calculation moved before the return/JSX block


  // Handle No Results State / Error State
  
  return (
    <div className="min-h-screen bg-gray-50 font-opensans pt-[116px]">
      {SearchBar}

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Results Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Showing Properties in {location || "All Destinations"}
          </h1>
          <span className="text-sm text-gray-600">
             {totalReviewsCount.toLocaleString()} Ratings found {/* FIX: Added " Ratings found" text back */}
          </span> 
        </div>

        {/* Hotel Cards - EXACT FIGMA LAYOUT */}
        <div className="space-y-6">
          {hotels.map((hotel, index) => {
            const currentImageIndex = selectedImages[index] || 0;
            const discountAmount = hotel.originalPrice - hotel.price;

            return (
              <div
                key={hotel.id}
                onClick={() => handleHotelClick(hotel.id)}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="md:w-[380px] flex-shrink-0">
                    <div className="relative h-[240px] md:h-full">
                      <img
                        src={hotel.images[currentImageIndex] || "https://placehold.co/550x320/cccccc/333333?text=No+Image"}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-4 left-4 flex gap-2">
                        {hotel.images.slice(0, 4).map((img, imgIndex) => (
                          <button
                            key={imgIndex}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleImageSelect(index, imgIndex);
                            }}
                            className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                              currentImageIndex === imgIndex
                                ? "border-white scale-105"
                                : "border-transparent opacity-70 hover:opacity-100"
                            }`}
                          >
                            {imgIndex < 3 ? (
                              <img
                                src={img}
                                alt={`Thumbnail ${imgIndex + 1}`}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-800 bg-opacity-70 flex items-center justify-center text-white text-xs font-semibold">
                                View All
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Content Section - EXACT FIGMA STRUCTURE */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col lg:flex-row h-full gap-6">
                      {/* Left Column: Hotel Details */}
                      <div className="flex-1">
                        {/* Hotel Name and Location */}
                        <h2 className="text-xl font-bold text-gray-900 mb-1">
                          {hotel.name}
                        </h2>
                        {/* FIX 3: ADDED DYNAMIC RATING AND REVIEW COUNT DISPLAY HERE */}
                        {/* <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                            i < Math.round(hotel.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-700 font-semibold">{hotel.rating.toFixed(1)}</span>
                            <span className="text-sm text-gray-500">| {hotel.reviewsCount.toLocaleString()} Reviews</span>
                        </div> */}
                        {/* END FIX 3 */}
                        
                        <div className="flex items-center gap-2 text-gray-600 mb-4">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">Mahipalpur | 1.5Km drive to Mall Road</span>
                        </div>

                        {/* Amenities - Simple checkboxes like Figma */}
                        <div className="flex flex-wrap gap-3 mb-6">
                          {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200"
                            >
                              <div className="w-3 h-3 border border-gray-400 rounded-sm flex items-center justify-center">
                                {amenity === "Gym" || amenity === "Restaurant" ? (
                                  <Check className="w-2 h-2 text-gray-600" />
                                ) : null}
                              </div>
                              <span className="text-sm text-gray-700">{amenity}</span>
                            </div>
                          ))}
                        </div>

                        {/* Features List - EXACT FIGMA STYLE */}
                        <div className="space-y-3">
                          {/* Free WiFi */}
                          <div className="flex items-center gap-3">
                            <Wifi className="w-5 h-5 text-gray-700" />
                            <span className="text-gray-700">Free WiFi</span>
                          </div>

                          {/* Couple Friendly */}
                          <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-gray-700" />
                            <span className="text-gray-700">Couple Friendly</span>
                          </div>

                          {/* Free Cancellations */}
                          <div className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-green-600" />
                            <span className="text-gray-700 font-medium">Free Cancellations</span>
                          </div>

                          {/* Additional features from API if available */}
                          {hotel.amenities.slice(3, 6).map((amenity, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <Check className="w-5 h-5 text-gray-500" />
                              <span className="text-gray-700">{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Column: Price and Booking - EXACT FIGMA STYLE */}
                      <div className="lg:w-[300px] border-l flex flex-col justify-between h-full border-gray-200 pl-6">
                        {/* Coupon Section - RED BADGE LIKE FIGMA */}
                        <div className="mb-4">
                          <div className="inline-flex items-center bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                            <span>Discount</span>
                            <span className="ml-1 bg-white text-red-500 px-1 rounded">₹{discountAmount}</span>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            Pay using Canara Bank Credit Cards EMI to avail the offer with No Cost EMI
                          </p>
                        </div>

                        {/* Price Section */}
                        <div className="mt-6 mb-0">
                          {/* Tax Info */}
                          <div className="text-right mb-3">
                            <span className="text-xs text-gray-500">
                              + ₹{hotel.taxes} taxes & fees per night
                            </span>
                          </div>

                          {/* Prices */}
                          <div className="flex items-end justify-between mb-4">
                            <div className="text-left">
                              <div className="text-lg text-gray-400 line-through">
                                ₹{hotel.originalPrice.toLocaleString()}
                              </div>
                            </div>
                            <div className="text-right">
                              <button className="bg-[#22C55E] hover:bg-green-600 text-white px-5 py-3 rounded-lg font-bold text-xl shadow-md transition-colors">
                                ₹{hotel.price.toLocaleString()}
                              </button>
                            </div>
                          </div>

                          {/* Additional Info */}
                          <div className="text-xs text-gray-500 space-y-1 mb-4">
                            <div className="flex items-center gap-2">
                              <Check className="w-3 h-3 text-green-600" />
                              <span>Book @ 0 available</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="w-3 h-3 text-green-600" />
                              <span>Breakfast available at extra cost</span>
                            </div>
                          </div>

                          {/* Book Now Button - BLACK BUTTON */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleHotelClick(hotel.id);
                            }}
                            className="w-full bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-sm"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-10">
          {hotels.length > 0 && (<></>
//             <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
//               Load More
//             </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelListingPage;