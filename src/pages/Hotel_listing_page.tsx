"use client";
import React, { useState, useEffect } from "react";
import {
  Star,
  Check,
  MapPin,
  Users,
  Calendar,
  Search,
  SlidersHorizontal,
} from "lucide-react";

const HotelListingPage: React.FC = () => {
  const [sortBy, setSortBy] = useState("Most Popular");
  const [selectedImages, setSelectedImages] = useState<{ [key: number]: number }>({});
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Search filters state
  const [searchLocation, setSearchLocation] = useState("Goa");
  const [checkIn, setCheckIn] = useState("11-16 Nov");
  const [guests, setGuests] = useState("3 guests");

  const sortOptions = [
    "Most Popular",
    "Price- Low to high",
    "Price- High to low",
    "Best Rated",
    "Lowest Price & Best Rated",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("shineetrip_token");
        if (!token) {
          console.warn("No token found — please log in first.");
          setLoading(false);
          return;
        }

        const propertiesRes = await fetch("http://46.62.160.188:3000/properties", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!propertiesRes.ok) throw new Error("Failed to fetch properties");

        const propertiesData = await propertiesRes.json();
        console.log("Fetched properties:", propertiesData);

        const propertyList = propertiesData.data || propertiesData;
        setProperties(propertyList);

        // Initialize selected images
        const initialImages: { [key: number]: number } = {};
        propertyList.forEach((_: any, index: number) => {
          initialImages[index] = 0;
        });
        setSelectedImages(initialImages);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleImageSelect = (hotelIndex: number, imageIndex: number) => {
    setSelectedImages((prev) => ({
      ...prev,
      [hotelIndex]: imageIndex,
    }));
  };

  const getPropertyImages = (property: any) => {
    if (property.images && property.images.length > 0) {
      return property.images;
    }
    return [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
      "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
    ];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-lg font-medium">Loading properties...</p>
      </div>
    );
  }

  if (!properties.length) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-lg font-medium">No properties found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-16 bg-gray-50">
      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4 justify-center">
            <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-full px-6 py-3 shadow-sm">
              <MapPin className="w-5 h-5 text-amber-500" />
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="outline-none text-gray-700 font-medium min-w-[100px]"
              />
              <div className="h-6 w-px bg-gray-300"></div>
              <Calendar className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="outline-none text-gray-700 font-medium min-w-[120px]"
              />
              <div className="h-6 w-px bg-gray-300"></div>
              <Users className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="outline-none text-gray-700 font-medium min-w-[100px]"
              />
              <button className="bg-amber-400 p-2 rounded-full hover:bg-amber-500 transition-colors">
                <Search className="w-5 h-5 text-white" />
              </button>
            </div>
            <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Sort Options */}
        <div className="mb-6 flex items-center gap-4">
          <span className="font-bold text-base text-gray-900">Sort By:</span>
          <div className="flex gap-2 flex-wrap">
            {sortOptions.map((option) => (
              <button
                key={option}
                onClick={() => setSortBy(option)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
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

        {/* Property Cards */}
        <div className="space-y-6">
          {properties.map((property: any, index: number) => {
            const images = getPropertyImages(property);
            const currentImageIndex = selectedImages[index] || 0;
            const features = property.selectedFeatures || [];
            const roomType = property.roomTypes?.[0];
            const retailPrice = parseFloat(roomType?.price?.retail_price || "0");
            const retailTaxPrice = parseFloat(roomType?.price?.retail_tax_price || "0");
            const taxAmount = retailTaxPrice > retailPrice ? retailTaxPrice - retailPrice : 0;

            return (
              <div
                key={property.id || index}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex gap-0">
                  {/* Image Section */}
                  <div className="w-[420px] flex-shrink-0">
                    <div className="relative h-full">
                      <img
                        src={images[currentImageIndex]}
                        alt={property.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-4 left-4 flex gap-2">
                        {images.slice(0, 4).map((img: string, imgIndex: number) => (
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
                    <div className="flex justify-between h-full">
                      {/* Left Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-green-600 text-green-600" />
                          ))}
                          <span className="text-sm text-gray-600 font-medium">
                            {property.rating || "4.8"} (
                            {Math.floor(Math.random() * 5000) + 1000} Ratings)
                          </span>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-1">
                          {property.name}
                        </h2>
                        <p className="text-sm text-gray-600 mb-4">
                          {property.city || "Location"} |{" "}
                          {property.address || "1.5Km drive to city center"}
                        </p>

                        <div className="flex gap-2 mb-6 flex-wrap">
                          {features.slice(0, 3).map((feature: any, idx: number) => (
                            <span
                              key={idx}
                              className="px-4 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full border border-gray-200"
                            >
                              {feature.name}
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

                      {/* Right Content */}
                      <div className="w-64 flex flex-col justify-between">
                        <div className="mb-4">
                          <h3 className="font-bold text-lg mb-3">Coupons</h3>
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-red-600 font-semibold text-sm">
                                🏷️ Discount
                              </span>
                              <span className="text-green-600 font-bold">₹ 565 OFF</span>
                            </div>
                            <p className="text-xs text-gray-600">
                              Pay using Canara Bank Credit Cards EMI to avail the offer with
                              No Cost EMI
                            </p>
                          </div>
                        </div>

                        {/* ✅ Dynamic Price Section */}
                        <div>
                          <p className="text-xs text-gray-500 text-right mb-1">
                            + ₹ {Math.round(taxAmount).toLocaleString()} taxes & fees per night
                          </p>
                          <div className="flex items-end justify-end gap-3">
                            <span className="text-gray-400 line-through text-lg">
                              ₹ {retailPrice ? Math.floor(retailPrice * 1.3).toLocaleString() : "00"}
                            </span>
                            <span className="text-green-600 font-bold text-3xl">
                              ₹ {retailPrice ? retailPrice.toLocaleString() : "00"}
                            </span>
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
      </div>
    </div>
  );
};

export default HotelListingPage;
