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
    // Safe check for occupancyConfiguration
    const occupancy = room.occupancyConfiguration || { max_occ: 3 }; 

    if (!price) {
        return null;
    }

    // Yahan hum hotelImages use kar rahe hain kyunki room images API se nahi aa rahe the.
    const roomImages = hotelImages && hotelImages.length > 0 ? hotelImages : ['https://placehold.co/600x400?text=No+Image'];
    
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
    // Assuming retail_tax_price is the tax amount itself based on typical UI patterns
    const taxAmount = taxPrice; 

    // Helper function to handle booking click
    const handleBookNowClick = (e: React.MouseEvent, roomData: any) => {
        e.stopPropagation();
        onBookNowClick(roomData);
    }
    
    // Helper function to handle more info click
    const handleMoreInfoClick = (e: React.MouseEvent, roomData: any) => {
        e.stopPropagation();
        onMoreInfoClick(roomData);
    }

    // --- NEW HELPER FUNCTION: cleanDescription (Revised for no static fallback) ---
const cleanDescription = (description: string | null | undefined): string => {
    if (!description) {
        return ''; // Agar data hi nahi hai, toh empty string return karo
    }
    
    let cleanedText = String(description);
    
    // 1. Saare HTML tags remove karein (e.g., <p>, <div>)
    cleanedText = cleanedText.replace(/<[^>]*>/g, '');
    
    // 2. Specific problematic strings remove karein
    cleanedText = cleanedText.replace(/jkhsmsvskvynkjykkdckdc/g, ''); 
    
    // 3. Literal curly braces aur brackets/fragments remove karein
    cleanedText = cleanedText.replace(/\{\}/g, '').replace(/<>/g, '');
    
    // 4. Multiple spaces ko single space banao aur trim karo
    cleanedText = cleanedText.replace(/\s\s+/g, ' ').trim();
    
    // Agar cleaning ke baad bhi string empty ho jaye, toh empty string return ho jayega.
    return cleanedText; 
};

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 transition-all hover:shadow-md">
            <div className="flex flex-col lg:flex-row gap-6">
                
                {/* Image Carousel Section */}
                <div className="w-full lg:w-[320px] flex-shrink-0">
                    {/* Main Image */}
                    <div className="relative h-56 lg:h-52 rounded-xl overflow-hidden mb-2 group">
                        <img 
                            src={roomImages[currentImageIndex]} 
                            alt={room.room_type} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {roomImages.length > 1 && (
                            <>
                                <button onClick={goToPrevious} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-md text-gray-800 opacity-0 group-hover:opacity-100 transition-all z-10">
                                    <ChevronLeft size={16} />
                                </button>
                                <button onClick={goToNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-md text-gray-800 opacity-0 group-hover:opacity-100 transition-all z-10">
                                    <ChevronRight size={16} />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Thumbnail Navigation */}
                    {roomImages.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
                            {roomImages.slice(0, 4).map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                                    className={`w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                                        currentImageIndex === idx ? 'border-green-600 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                                    }`}
                                >
                                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Room Details Section */}
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        {/* Header with Title & Price Badge */}
                        <div className="flex flex-col md:flex-row justify-between items-start gap-2 mb-2">
                             <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-1">{room.room_type}</h3>
                                <div className="flex items-center gap-4 text-gray-500 text-sm">
                                    <div className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        <span>{occupancy.max_occ} Guests</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Maximize2 className="w-4 h-4" />
                                        <span>200sqft</span>
                                    </div>
                                </div>
                             </div>
                             
                             {/* Price Badge (Top Right) */}
                             <div className="text-left md:text-right mt-2 md:mt-0">
                                <span className="text-xs text-gray-500 block mb-1">+ ₹ {taxAmount} taxes & fees per night</span>
                                <div className="flex items-center gap-2 justify-start md:justify-end">
                                    <span className="text-gray-400 line-through text-lg">₹ {Math.round(basePrice * 1.5).toLocaleString()}</span>
                                    <div className="bg-[#1AB64F] text-white px-5 py-1 rounded-lg text-2xl font-bold">
                                        ₹ {basePrice.toLocaleString()}
                                    </div>
                                </div>
                             </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-600 mb-6 leading-relaxed line-clamp-2 max-w-3xl">
                            {cleanDescription(room.description || room.short_description)}
                            {' '}
                            <span 
                                onClick={(e) => handleMoreInfoClick(e, room)}
                                className="text-[#D2A256] cursor-pointer hover:underline font-medium"
                            >
                                more info
                            </span>
                        </p>
                    </div>

                    {/* Pricing Options (Matches Figma Boxes) */}
                    <div className="pt-5 border-t border-dashed border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            
                            {/* Option 1: Highlighted (Active Plan) */}
                            <div className="flex flex-col justify-between border hover:border-[#D2A256] hover:bg-[#FFFBF4] rounded-xl p-4 relative h-full min-h-[120px]">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="font-bold text-gray-900">Room Only</div>
                                        <div className="text-[11px] text-gray-500 underline cursor-pointer">Inclusions & Policies</div>
                                    </div>
                                    <div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-green-600 font-bold text-lg">INR {basePrice.toLocaleString()}</span>
                                            <span className="text-gray-400 line-through text-xs">INR {Math.round(basePrice * 1.3).toLocaleString()}</span>
                                        </div>
                                        <div className="text-[10px] text-gray-500 mt-1">(for 1 night) Incl. of taxes & fees</div>
                                    </div>
                                </div>
                                <button 
                                    onClick={(e) => handleBookNowClick(e, room)}
                                    className="w-full bg-black text-white text-[11px] font-bold uppercase py-3 rounded-lg mt-3 hover:bg-gray-800 transition-colors tracking-wide"
                                >
                                    BOOK NOW
                                </button>
                            </div>

                            {/* Option 2: Standard Plan (Visual Placeholder) */}
                            <div className="flex flex-col justify-between border hover:border-[#D2A256] hover:bg-[#FFFBF4] border-gray-200 bg-white rounded-xl p-4 relative h-full min-h-[120px] opacity-80 hover:opacity-100 transition-opacity">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="font-bold text-gray-900">Room Only</div>
                                        <div className="text-[11px] text-gray-500 underline cursor-pointer">Inclusions & Policies</div>
                                    </div>
                                    <div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-green-600 font-bold text-lg">INR {Math.round(basePrice * 1.2).toLocaleString()}</span>
                                            <span className="text-gray-400 line-through text-xs">INR {Math.round(basePrice * 1.5).toLocaleString()}</span>
                                        </div>
                                        <div className="text-[10px] text-gray-500 mt-1">(for 1 night) Incl. of taxes & fees</div>
                                    </div>
                                </div>
                                <button 
                                    onClick={(e) => handleBookNowClick(e, room)}
                                    className="w-full bg-black text-white text-[11px] font-bold uppercase py-3 rounded-lg mt-3 hover:bg-gray-800 transition-colors tracking-wide"
                                >
                                    BOOK NOW
                                </button>
                            </div>

                             {/* Option 3: Standard Plan (Visual Placeholder) */}
                             <div className="hidden md:flex flex-col justify-between border hover:border-[#D2A256] hover:bg-[#FFFBF4] border-gray-200 bg-white rounded-xl p-4 relative h-full min-h-[120px] opacity-80 hover:opacity-100 transition-opacity">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="font-bold text-gray-900">Boom only</div>
                                        <div className="text-[11px] text-gray-500 underline cursor-pointer">Inclusions & Policies</div>
                                    </div>
                                    <div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-green-600 font-bold text-lg">INR {basePrice.toLocaleString()}</span>
                                            <span className="text-gray-400 line-through text-xs">INR {Math.round(basePrice * 1.3).toLocaleString()}</span>
                                        </div>
                                        <div className="text-[10px] text-gray-500 mt-1">(for 1 night) Incl. of taxes & fees</div>
                                    </div>
                                </div>
                                <button 
                                    onClick={(e) => handleBookNowClick(e, room)}
                                    className="w-full bg-black text-white text-[11px] font-bold uppercase py-3 rounded-lg mt-3 hover:bg-gray-800 transition-colors tracking-wide"
                                >
                                    BOOK NOW
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;