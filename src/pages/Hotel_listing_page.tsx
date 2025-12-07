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
} from "lucide-react";

interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  images: string[]; // Array of image URLs
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
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};


const HotelListingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // --- States read from URL ---
  // Agar URL mein dates past ki hain, toh unhe future ki dates se replace karna behtar hai for testing.
  const initialLocation = searchParams.get("location") || "";
  const initialCheckIn = searchParams.get("checkIn") || getTodayDateString(); 
  const initialCheckOut = searchParams.get("checkOut") || getTodayDateString();
  const initialAdults = searchParams.get("adults") || "2";
  const initialChildren = searchParams.get("children") || "0";
  
  // ✅ Editable States
  const [currentLocation, setCurrentLocation] = useState(initialLocation);
  const [currentCheckIn, setCurrentCheckIn] = useState(initialCheckIn);
  const [currentCheckOut, setCurrentCheckOut] = useState(initialCheckOut);
  const [currentAdults, setCurrentAdults] = useState(initialAdults);
  const [currentChildren, setCurrentChildren] = useState(initialChildren);

  const [sortBy, setSortBy] = useState("Most Popular");
  const [selectedImages, setSelectedImages] = useState<{ [key: number]: number }>({});
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false); 
  const [fetchError, setFetchError] = useState<string | null>(null);

  // API Fetch parameters (should be read from searchParams for effect dependency)
  const location = searchParams.get("location") || "";
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const adults = searchParams.get("adults") || "2";
  const children = searchParams.get("children") || "0";

  const sortOptions = [
    "Most Popular", "Price- Low to high", "Price- High to low", "Best Rated", "Lowest Price & Best Rated",
  ];
  
  // ✅ Function to handle navigation with new search parameters
  const handleSearch = () => {
      setFetchError(null);
      
      // Basic check to prevent searching past dates based on client machine time
      const today = getTodayDateString();
      if (currentCheckIn < today) {
          alert("Check-in date cannot be in the past. Please select today or a future date.");
          return;
      }

      const newSearchParams = new URLSearchParams({
          location: currentLocation,
          checkIn: currentCheckIn,
          checkOut: currentCheckOut,
          adults: currentAdults,
          children: currentChildren,
      }).toString();

      // Navigate to trigger re-fetch
      navigate(`/hotellists?${newSearchParams}`);
  };


  // ✅ Fetching logic (useCallback से wrap किया for stability)
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

        // Build API URL with search parameters (using URL params from hook)
        const apiUrl = new URL("http://46.62.160.188:3000/search/hotels");
        if (location) apiUrl.searchParams.append("location", location);
        if (checkIn) apiUrl.searchParams.append("checkIn", checkIn);
        if (checkOut) apiUrl.searchParams.append("checkOut", checkOut);
        if (adults) apiUrl.searchParams.append("adults", adults);
        if (children) apiUrl.searchParams.append("children", children);

        const response = await fetch(apiUrl.toString(), {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
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
        
        // Transform API data to match our interface
        const hotelList = (Array.isArray(data) ? data : []).map((item: any) => {
          const hotel = item.property;
          const roomDetails = item.roomDetails;
          
          if (!hotel) return null;

          return {
            id: String(hotel.id),
            name: hotel.name || "",
            location: `${hotel.city || ""}, ${hotel.country || ""}`.trim(),
            rating: parseFloat(hotel.rating) || 0,
            reviews: 0, 
            // FIX: Image mapping (img.image) aur invalid URL filter
            images: hotel.images?.map((img: any) => img.image).filter((url: string | null) => url && typeof url === 'string') || [], 
            amenities: hotel.selectedFeatures?.map((f: any) => f.name) || [],
            price: roomDetails?.retailPrice || 0,
            originalPrice: roomDetails?.totalPricePerNight || 0, 
            taxes: roomDetails?.taxAmount || 0,
            description: hotel.short_description || hotel.description || "",
          };
        }).filter((item): item is Hotel => item !== null);
        
        setHotels(hotelList);

        // Initialize selected images
        const initialImages: { [key: number]: number } = {};
        hotelList.forEach((_: any, index: number) => {
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

  // API fetch triggers when URL params change
  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]); 

  // Sync internal states when URL changes externally (optional, but good practice)
  useEffect(() => {
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
  
  // Handle No Results State / Error State (FIX 2: Error message display)
  if (hotels.length === 0 && hasSearched || fetchError) { 
      // FIX: Show the search bar section here so user can edit their input
      return (
          <div className="min-h-screen bg-gray-50 font-opensans pt-[116px]">
              {/* Search Bar section (Duplicated/Rendered Separately) */}
              <div className="bg-white border-b border-gray-200 sticky top-[116px] z-10 shadow-sm">
                  <div className="max-w-7xl mx-auto px-6 py-4">
                      {/* Search Fields (Editable) */}
                      <div className="flex items-center justify-center gap-0 mb-4">
                          {/* Location Field */}
                          <div className="flex-1 max-w-[250px] bg-gray-100 px-6 py-2 border-r border-gray-300">
                              <div className="text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">CITY, AREA OR PROPERTY</div>
                              <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4 text-[#D2A256]" />
                                  <input type="text" value={currentLocation} onChange={(e) => setCurrentLocation(e.target.value)} className="text-base font-normal text-gray-900 bg-transparent w-full focus:outline-none" placeholder="Enter location"/>
                              </div>
                          </div>
                          {/* Check-in Field */}
                          <div className="flex-1 max-w-[200px] bg-gray-100 px-6 py-2 border-r border-gray-300">
                              <div className="text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">CHECK-IN</div>
                              <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-[#D2A256]" />
                                  <input type="date" value={currentCheckIn} onChange={(e) => setCurrentCheckIn(e.target.value)} className="text-base font-normal text-gray-900 bg-transparent w-full focus:outline-none"/>
                              </div>
                          </div>
                          {/* Check-out Field */}
                          <div className="flex-1 max-w-[200px] bg-gray-100 px-6 py-2 border-r border-gray-300">
                              <div className="text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">CHECK-OUT</div>
                              <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-[#D2A256]" />
                                  <input type="date" value={currentCheckOut} onChange={(e) => setCurrentCheckOut(e.target.value)} className="text-base font-normal text-gray-900 bg-transparent w-full focus:outline-none"/>
                              </div>
                          </div>
                          {/* Room & Guest Field & Search Button */}
                          <div className="flex-1 max-w-[280px] bg-gray-100 px-6 py-2 flex items-center justify-between gap-4">
                              <div>
                                  <div className="text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">ROOM & GUEST</div>
                                  <div className="flex items-center gap-2">
                                      <Users className="w-4 h-4 text-[#D2A256]" />
                                      <input type="number" min="1" value={currentAdults} onChange={(e) => setCurrentAdults(e.target.value)} className="text-base font-normal text-gray-900 bg-transparent w-12 focus:outline-none"/>
                                      <span className="text-base font-normal text-gray-900">Adults</span>
                                  </div>
                              </div>
                              <button onClick={handleSearch} className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-colors shadow-md">
                                  <Search className="w-4 h-4" />
                              </button>
                          </div>
                      </div>

                      {/* Sort Options (Hidden on error/no results for simplicity, but included here for completeness) */}
                      <div className="flex items-center gap-4 justify-center flex-wrap">
                        {/* Sort options JSX */}
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900">Sort By:</span>
                          <SlidersHorizontal className="w-4 h-4 text-gray-500" />
                        </div>
                        <div className="flex gap-3 flex-wrap">
                          {sortOptions.map((option) => (
                            <button key={option} onClick={() => setSortBy(option)} className={`px-5 py-2 rounded-full text-sm font-normal transition-all ${sortBy === option ? "bg-gray-900 text-white" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"}`}>
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                  </div>
              </div>
              
              {/* Error/No Result Message */}
              <div className="flex items-center justify-center pt-12 pb-24">
                  <div className="text-center p-12 rounded-lg shadow-md bg-white">
                      <h2 className="text-2xl font-bold text-gray-800 mb-3">
                          {fetchError ? 'Error Fetching Results' : 'No Properties Found'}
                      </h2>
                      <p className="text-red-600 mb-3">
                         {/* Display specific server message */}
                         {fetchError || 'Try adjusting your filters, location, or dates.'}
                      </p>
                      <p className="text-gray-600 font-medium">
                         NOTE: Check-in dates must be today or in the future.
                      </p>
                  </div>
              </div>
          </div>
      );
  }


  return (
    <div className="min-h-screen bg-gray-50 font-opensans pt-[116px]">
      {/* Search Bar (FIX 3: Made fields editable) */}
      <div className="bg-white border-b border-gray-200 sticky top-[116px] z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          {/* Search Fields */}
          <div className="flex items-center justify-center gap-0 mb-4">
            {/* Location Field */}
            <div className="flex-1 max-w-[250px] bg-gray-100 px-6 py-2 border-r border-gray-300">
              <div className="text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">
                CITY, AREA OR PROPERTY
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D2A256]" />
                <input 
                    type="text" 
                    value={currentLocation}
                    onChange={(e) => setCurrentLocation(e.target.value)}
                    className="text-base font-normal text-gray-900 bg-transparent w-full focus:outline-none"
                    placeholder="Enter location"
                />
              </div>
            </div>

            {/* Check-in Field */}
            <div className="flex-1 max-w-[200px] bg-gray-100 px-6 py-2 border-r border-gray-300">
              <div className="text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">
                CHECK-IN
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D2A256]" />
                <input 
                    type="date" 
                    value={currentCheckIn} 
                    onChange={(e) => setCurrentCheckIn(e.target.value)}
                    className="text-base font-normal text-gray-900 bg-transparent w-full focus:outline-none"
                />
              </div>
            </div>

            {/* Check-out Field */}
            <div className="flex-1 max-w-[200px] bg-gray-100 px-6 py-2 border-r border-gray-300">
              <div className="text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">
                CHECK-OUT
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D2A256]" />
                <input 
                    type="date" 
                    value={currentCheckOut} 
                    onChange={(e) => setCurrentCheckOut(e.target.value)}
                    className="text-base font-normal text-gray-900 bg-transparent w-full focus:outline-none"
                />
              </div>
            </div>

            {/* Room & Guest Field & Search Button */}
            <div className="flex-1 max-w-[280px] bg-gray-100 px-6 py-2 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">
                  ROOM & GUEST
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#D2A256]" />
                <input 
                    type="number"
                    min="1"
                    value={currentAdults}
                    onChange={(e) => setCurrentAdults(e.target.value)}
                    className="text-base font-normal text-gray-900 bg-transparent w-12 focus:outline-none"
                />
                  <span className="text-base font-normal text-gray-900">Adults</span>
                </div>
              </div>
              {/* Search Button - Trigger new search */}
              <button 
                  onClick={handleSearch} // ✅ Navigate to hotel listing with new params
                  className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-colors shadow-md"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-4 justify-center flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-900">Sort By:</span>
              <SlidersHorizontal className="w-4 h-4 text-gray-500" />
            </div>
            <div className="flex gap-3 flex-wrap">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`px-5 py-2 rounded-full text-sm font-normal transition-all ${
                    sortBy === option
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl  mx-auto px-6 py-4">
        {/* Results Header */}
        <div className="mb-4 mt-2">
          <h1 className="2xl font-bold text-gray-900">
            Showing Properties in {location || "Manali"}
          </h1>
        </div>

        {/* Hotel Cards */}
        <div className="space-y-8">
          {hotels.map((hotel, index) => {
            const currentImageIndex = selectedImages[index] || 0;

            return (
              <div
                key={hotel.id}
                onClick={() => handleHotelClick(hotel.id)}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex flex-col md:flex-row gap-0">
                  {/* Image Section */}
                  <div className="w-full md:w-[550px] flex-shrink-0">
                    <div className="relative h-[280px] md:h-[320px]">
                      <img
                        src={hotel.images[currentImageIndex] || 'https://placehold.co/550x320/cccccc/333333?text=No+Image'} 
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
                            className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
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

                  {/* Content Section */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col lg:flex-row justify-between h-full gap-6">
                      {/* Left Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(hotel.rating)
                                  ? "fill-green-600 text-green-600"
                                  : "fill-gray-300 text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-600 font-medium">
                            {hotel.rating.toFixed(1)} ({hotel.reviews.toLocaleString()} Ratings)
                          </span>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-1">
                          {hotel.name}
                        </h2>
                        <p className="text-sm text-gray-600 mb-4">
                          {hotel.location} | {hotel.description}
                        </p>

                        <div className="flex gap-2 mb-6 flex-wrap">
                          {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                            <span
                              key={idx}
                              className="px-4 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full border border-gray-200"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-green-600" />
                            <span className="text-gray-700">Couple Friendly</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="w-5 h-5 text-green-600" />
                            <span className="text-gray-700">Free Cancellations</span>
                          </div>
                          {hotel.amenities.slice(3).map((amenity, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <Check className="w-5 h-5 text-green-600" />
                              <span className="text-gray-700">{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Content - Price */}
                      <div className="w-full lg:w-[320px] flex flex-col justify-end border-l border-gray-100 pl-6">
                        {/* Price Section */}
                        <div className="flex flex-col items-end mt-auto">
                          <span className="text-xs text-gray-500 mb-1">
                            + ₹ {Math.round(hotel.taxes)} taxes & fees per night
                          </span>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-lg text-gray-400 line-through">
                              ₹ {hotel.originalPrice.toLocaleString()}
                            </span>
                            <button className="bg-[#22C55E] hover:bg-green-600 text-white px-6 py-2 rounded-lg font-bold text-2xl shadow-sm transition-colors">
                              ₹ {hotel.price.toLocaleString()}
                            </button>
                          </div>
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
        <div className="flex justify-center mt-8">
          {hotels.length > 0 && ( // FIX 3: Conditionally render Load More
                <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
                    Load More
                </button>
            )}
            {/* FIX 4: Handle No Results message */}
            {hotels.length === 0 && !loading && (
                <div className="text-center p-4">
                    <p className="text-lg text-gray-700 font-semibold">No hotels found for your search criteria.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default HotelListingPage;