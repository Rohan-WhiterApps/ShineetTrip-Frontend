"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Star,
  Check,
  MapPin,
  Users,
  Calendar,
  Search,
  SlidersHorizontal,
  Tag,
} from "lucide-react";

interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  images: string[];
  amenities: string[];
  price: number;
  originalPrice: number;
  taxes: number;
  description: string;
}

const HotelListingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("Most Popular");
  const [selectedImages, setSelectedImages] = useState<{ [key: number]: number }>({});
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  // Get search parameters from URL
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

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const token = localStorage.getItem("shineetrip_token");
        if (!token) {
          console.warn("No token found — please log in first.");
          setLoading(false);
          return;
        }

        // Build API URL with search parameters
        const apiUrl = new URL("http://46.62.160.188:3000/search/hotels");
        if (location) apiUrl.searchParams.append("location", location);
        if (checkIn) apiUrl.searchParams.append("checkIn", checkIn);
        if (checkOut) apiUrl.searchParams.append("checkOut", checkOut);
        if (adults) apiUrl.searchParams.append("adults", adults);
        if (children) apiUrl.searchParams.append("children", children);

        console.log("API URL:", apiUrl.toString());
        console.log("Search params:", { location, checkIn, checkOut, adults, children });

        const response = await fetch(apiUrl.toString(), {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("API Error Response:", errorText);
          console.error("Status:", response.status, response.statusText);
          throw new Error(`Failed to fetch hotels: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        console.log("Fetched hotels:", data);

        // Transform API data to match our interface
        // API returns array of objects with 'property' and 'availableRoomTypes'
        const hotelList = (Array.isArray(data) ? data : []).map((item: any) => {
          const hotel = item.property || item;
          const roomTypes = item.availableRoomTypes || [];
          
          return {
            id: hotel.id || hotel._id,
            name: hotel.name || "Hotel Name",
            location: `${hotel.city || location}, ${hotel.country || ""}`.trim(),
            rating: parseFloat(hotel.rating) || 5,
            reviews: hotel.reviews || Math.floor(Math.random() * 5000) + 1000,
            images: hotel.images && hotel.images.length > 0 
              ? hotel.images.map((img: any) => img.img_link || img)
              : [
                  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
                  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
                  "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800",
                  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
                ],
            amenities: hotel.selectedFeatures?.map((f: any) => f.name) || ["Free WiFi", "Pool", "Parking"],
            price: roomTypes[0]?.price?.retail_price || 3000,
            originalPrice: (roomTypes[0]?.price?.retail_price || 3000) * 1.3,
            taxes: (roomTypes[0]?.price?.retail_tax_price || 0) - (roomTypes[0]?.price?.retail_price || 0),
            description: hotel.address || hotel.short_description || "1.5Km drive to city center",
          };
        });

        console.log("Transformed hotels:", hotelList);
        setHotels(hotelList);

        if (hotelList.length === 0) {
          console.warn("No hotels found for the search criteria");
        }

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
      }
    };

    fetchHotels();
  }, [location, checkIn, checkOut, adults, children]);

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
    navigate(`/room-booking/${hotelId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-opensans pt-[116px]">
      {/* Search Bar */}
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
                <span className="text-base font-normal text-gray-900">{location || "Manali"}</span>
              </div>
            </div>

            {/* Check-in Field */}
            <div className="flex-1 max-w-[200px] bg-gray-100 px-6 py-2 border-r border-gray-300">
              <div className="text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">
                CHECK-IN
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D2A256]" />
                <span className="text-base font-normal text-gray-900">
                  {checkIn ? new Date(checkIn).toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }) : "Fri, 21 Nov 2025"}
                </span>
              </div>
            </div>

            {/* Check-out Field */}
            <div className="flex-1 max-w-[200px] bg-gray-100 px-6 py-2 border-r border-gray-300">
              <div className="text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">
                CHECK-OUT
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D2A256]" />
                <span className="text-base font-normal text-gray-900">
                  {checkOut ? new Date(checkOut).toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }) : "Fri, 21 Nov 2025"}
                </span>
              </div>
            </div>

            {/* Room & Guest Field */}
            <div className="flex-1 max-w-[200px] bg-gray-100 px-6 py-2">
              <div className="text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">
                ROOM & GUEST
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#D2A256]" />
                <span className="text-base font-normal text-gray-900">
                  1 Room, {adults} Adult{parseInt(adults) > 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Search Button */}
            <button className="bg-black text-white p-4 rounded-full hover:bg-gray-800 transition-colors ml-4">
              <Search className="w-5 h-5" />
            </button>
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

      <div className="max-w-7xl  mx-auto px-6 py-4">
        {/* Results Header */}
        <div className="mb-4 mt-2">
          <h1 className="text-2xl font-bold text-gray-900">
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
                        src={hotel.images[currentImageIndex]}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-4 left-4 flex gap-2">
                        {hotel.images.slice(0, 4).map((img, imgIndex) => (
                          <button
                            key={imgIndex}
                            onClick={() => handleImageSelect(index, imgIndex)}
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
                          <div className="flex items-center gap-2">
                            <Check className="w-5 h-5 text-green-600" />
                            <span className="text-gray-700">Book @ 0 available</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="w-5 h-5 text-green-600" />
                            <span className="text-gray-700">
                              Breakfast available at extra cost.
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Content - Coupons & Price */}
                      <div className="w-full lg:w-[320px] flex flex-col justify-between border-l border-gray-100 pl-6">
                        {/* Coupons Section */}
                        <div className="mb-4">
                          <h3 className="font-semibold text-gray-900 mb-3">Coupons</h3>
                          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded text-xs font-bold text-gray-700">
                                <Tag className="w-3 h-3 fill-red-500 text-red-500" />
                                Discount
                              </div>
                              <span className="text-green-600 font-bold text-sm">₹ 565 OFF</span>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed">
                              Pay using Canara Bank Credit Cards EMI to avail the offer with No Cost EMI
                            </p>
                          </div>
                        </div>

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
          <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelListingPage;
