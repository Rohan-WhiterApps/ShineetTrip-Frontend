import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Users, Maximize2, MapPin, Calendar, Search } from 'lucide-react';

// Room Card Component with Image Carousel and Thumbnails
const RoomCard = ({ room, hotelImages }: { room: any; hotelImages: string[] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const price = room.price;
  const occupancy = room.occupancyConfiguration;

  if (!price) {
    return null;
  }

  const roomImages = hotelImages.length > 0 ? hotelImages : [];
  
  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? roomImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === roomImages.length - 1 ? 0 : prev + 1));
  };

  const basePrice = parseFloat(price.retail_price);
  const taxPrice = parseFloat(price.retail_tax_price);
  const taxAmount = taxPrice - basePrice;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-6">
      <div className="flex gap-6">
        {/* Image Carousel Section */}
        <div className="w-64 flex-shrink-0">
          {/* Main Image */}
          <div className="relative h-48 rounded-lg overflow-hidden mb-2 group">
            {roomImages.length > 0 ? (
              <>
                <img 
                  src={roomImages[currentImageIndex]} 
                  alt={room.room_type} 
                  className="w-full h-full object-cover"
                />
                {roomImages.length > 1 && (
                  <>
                    <button
                      onClick={goToPrevious}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronLeft className="w-4 h-4 text-gray-800" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-800" />
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
          </div>

          {/* Thumbnail Navigation */}
          {roomImages.length > 1 && (
            <div className="flex gap-2">
              {roomImages.slice(0, 4).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-14 h-14 rounded overflow-hidden border-2 transition-all ${
                    currentImageIndex === idx ? 'border-green-600' : 'border-gray-300 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Room Details Section */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{room.room_type}</h3>
          
          {/* Guest and Size Info */}
          <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
            {occupancy && (
              <>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{occupancy.max_occ} Guests</span>
                </div>
                <div className="flex items-center gap-1">
                  <Maximize2 className="w-4 h-4" />
                  <span>200sqft</span>
                </div>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-700 mb-4 line-clamp-2">
            {room.description || room.short_description || 'The rooms have a state-of-the-art design, curated to serve the modern traveler.'}
            {' '}
            <span className="text-blue-600 cursor-pointer hover:underline">more info</span>
          </p>

          {/* Pricing Options */}
          <div className="flex gap-4">
            {/* Room Only Option 1 */}
            <div className="flex-1 border border-gray-300 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-semibold text-sm">Room Only</div>
                  <div className="text-xs text-blue-600 cursor-pointer hover:underline">Inclusions & Policies</div>
                </div>
              </div>
              <div className="mb-2">
                <div className="text-xs text-gray-500 mb-1">Standard Rate</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-green-600 font-bold text-lg">INR {basePrice.toLocaleString()}</span>
                  <span className="text-gray-400 line-through text-sm">INR {taxPrice.toLocaleString()}</span>
                </div>
                <div className="text-xs text-gray-500">(for 1 night) Incl. of taxes & fees</div>
              </div>
              <button className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-800 transition-colors">
                BOOK NOW
              </button>
            </div>

            {/* Room Only Option 2 */}
            <div className="flex-1 border border-gray-300 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-semibold text-sm">Room Only</div>
                  <div className="text-xs text-blue-600 cursor-pointer hover:underline">Inclusions & Policies</div>
                </div>
              </div>
              <div className="mb-2">
                <div className="text-xs text-gray-500 mb-1">Discounted Rate</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-green-600 font-bold text-lg">INR {basePrice.toLocaleString()}</span>
                  <span className="text-gray-400 line-through text-sm">INR {taxPrice.toLocaleString()}</span>
                </div>
                <div className="text-xs text-gray-500">(for 1 night) Incl. of taxes & fees</div>
              </div>
              <button className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-800 transition-colors">
                BOOK NOW
              </button>
            </div>

            {/* Room Only Option 3 */}
            <div className="flex-1 border border-gray-300 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-semibold text-sm">Room Only</div>
                  <div className="text-xs text-blue-600 cursor-pointer hover:underline">Inclusions & Policies</div>
                </div>
              </div>
              <div className="mb-2">
                <div className="text-xs text-gray-500 mb-1">Best Rate</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-green-600 font-bold text-lg">INR {basePrice.toLocaleString()}</span>
                  <span className="text-gray-400 line-through text-sm">INR {taxPrice.toLocaleString()}</span>
                </div>
                <div className="text-xs text-gray-500">(for 1 night) Incl. of taxes & fees</div>
              </div>
              <button className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-800 transition-colors">
                BOOK NOW
              </button>
            </div>
          </div>
        </div>

        {/* Price Badge on Right */}
        <div className="flex flex-col items-end justify-start">
          <div className="text-right mb-2">
            <div className="text-xs text-gray-500">+ ₹ {taxAmount.toFixed(0)} taxes & fees per night</div>
            <div className="text-sm text-gray-400">₹ {taxPrice.toLocaleString()}</div>
          </div>
          <div className="bg-green-600 text-white px-4 py-2 rounded-lg">
            <div className="text-2xl font-bold">₹ {(basePrice / 1000).toFixed(1)}k</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function RoomBookingPage() {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [hotelData, setHotelData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotelData = async () => {
      if (!hotelId) {
        setError('No hotel ID provided');
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('shineetrip_token');
        const response = await fetch(`http://46.62.160.188:3000/properties/${hotelId}`, {
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch hotel data: ${response.status}`);
        }

        const data = await response.json();
        setHotelData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching hotel data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load hotel data');
        setLoading(false);
      }
    };

    fetchHotelData();
  }, [hotelId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 font-opensans pt-[116px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading hotel details...</p>
        </div>
      </div>
    );
  }

  if (error || !hotelData) {
    return (
      <div className="min-h-screen bg-gray-50 font-opensans pt-[116px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Hotel not found'}</p>
          <button
            onClick={() => window.history.back()}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const hotelImages = hotelData.images?.map((img: any) => img.img_link) || [];
  const roomTypes = hotelData.roomTypes?.filter((room: any) => room.show_front_office && room.is_active) || [];

  return (
    <div className="min-h-screen bg-gray-50 font-opensans pt-[116px]">
      {/* Search Bar - Matching Hotel Listing Page */}
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
                <span className="text-base font-normal text-gray-900">{hotelData.city || "Manali"}</span>
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
                  {hotelData.checkIn ? new Date(hotelData.checkIn).toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }) : "Fri, 21 Nov 2025"}
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
                  {hotelData.checkOut ? new Date(hotelData.checkOut).toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }) : "Sat, 22 Nov 2025"}
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
                  1 Room, 2 Adults
                </span>
              </div>
            </div>

            {/* Search Button */}
            <button className="bg-black text-white p-4 hover:bg-gray-800 transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-medium text-sm">1</div>
              <span className="font-medium text-sm">Room 1</span>
            </div>
            <div className="w-24 h-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center font-medium text-sm">2</div>
              <span className="text-gray-500 text-sm">Reservation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hotel Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{hotelData.name}</h1>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <span>{hotelData.city}</span>
            <span>|</span>
            <span>1.5km drive to {hotelData.address}</span>
          </div>
        </div>

        {/* Room Types */}
        <div className="mb-8">
          {roomTypes.length > 0 ? (
            roomTypes.map((room: any) => (
              <RoomCard key={room.id} room={room} hotelImages={hotelImages} />
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-600">No rooms available at this time.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}