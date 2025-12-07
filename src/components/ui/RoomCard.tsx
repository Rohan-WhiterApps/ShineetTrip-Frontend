import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Users, Maximize2 } from 'lucide-react';

// Interfaces for RoomCard Props
interface RoomCardProps {
    room: any; 
    hotelImages: string[];
    // Modal open karne ke liye handler
    onMoreInfoClick: (roomData: any) => void;
    // Booking flow shuru karne ke liye handler
    onBookNowClick: (roomData: any) => void; 
}

const RoomCard = ({ room, hotelImages, onMoreInfoClick, onBookNowClick }: RoomCardProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const price = room.price;
    const occupancy = room.occupancyConfiguration;

    if (!price) {
        return null;
    }

    // Yahan hum hotelImages use kar rahe hain kyunki room images API se nahi aa rahe the.
    const roomImages = hotelImages.length > 0 ? hotelImages : [];
    
    // Helper for carousel navigation (stops propagation)
    const goToPrevious = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === 0 ? roomImages.length - 1 : prev - 1));
    };

    const goToNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === roomImages.length - 1 ? 0 : prev + 1));
    };

    // Price calculations
    const basePrice = parseFloat(price.retail_price);
    const taxPrice = parseFloat(price.retail_tax_price);
    const taxAmount = taxPrice - basePrice;

    // ✅ Helper function to handle booking click (ensures stopPropagation is always called)
    const handleBookNowClick = (e: React.MouseEvent, roomData: any) => {
        e.stopPropagation();
        onBookNowClick(roomData);
    }
    
    // Helper function to handle more info click (ensures stopPropagation is always called)
    const handleMoreInfoClick = (e: React.MouseEvent, roomData: any) => {
        e.stopPropagation();
        onMoreInfoClick(roomData);
    }

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
                                    onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
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
                        <span 
                            onClick={(e) => handleMoreInfoClick(e, room)} // ✅ FIX APPLIED: Correct function name
                            className="text-blue-600 cursor-pointer hover:underline font-medium"
                        >
                            more info
                        </span>
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
                            <button 
                                onClick={(e) => handleBookNowClick(e, room)} // ✅ Call local helper
                                className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-800 transition-colors"
                            >
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
                            <button 
                                onClick={(e) => handleBookNowClick(e, room)} // ✅ Call local helper
                                className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-800 transition-colors"
                            >
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
                            <button 
                                onClick={(e) => handleBookNowClick(e, room)} // ✅ Call local helper
                                className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-800 transition-colors"
                            >
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

export default RoomCard;