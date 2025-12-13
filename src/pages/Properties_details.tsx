import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
// Required icons for Search Bar
import { MapPin, Calendar, Search, Users } from 'lucide-react'; 

import { RoomDetailsModal } from './Rooms_details_page'; 
import RoomCard from '../components/ui/RoomCard'; 
import { AvailabilityCheckModal } from '../components/ui/AvailabilityCheckModal'; 
import HotelReviews from '../components/ui/HotelReviews'; 
import { PolicyModal } from '../components/ui/PolicyModal';


// Main Component: RoomBookingPage
export default function RoomBookingPage() {
    const { hotelId } = useParams<{ hotelId: string }>();
    const hotelIdNumber = hotelId ? Number(hotelId) : null;
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // --- Component States ---
    const [hotelData, setHotelData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<any>(null);
const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);

    // NOTE: Ye states ab use nahi honge agar hum direct payment karte hain, 
    // lekin hum inhe declare rakhenge taaki component structure intact rahe.
    const [isAvailabilityCheckOpen, setIsAvailabilityCheckOpen] = useState(false);
    const [roomForCheck, setRoomForCheck] = useState<any>(null);

    // --- Search Parameters (Read from URL and made editable) ---
    const initialLocation = searchParams.get("location") || "";
    const initialCheckIn = searchParams.get("checkIn") || "";
    const initialCheckOut = searchParams.get("checkOut") || "";
    const initialAdults = searchParams.get("adults") || "2";
    const initialChildren = searchParams.get("children") || "0";

    // ✅ New States for Editable Fields
    const [currentLocation, setCurrentLocation] = useState(initialLocation);
    const [currentCheckIn, setCurrentCheckIn] = useState(initialCheckIn);
    const [currentCheckOut, setCurrentCheckOut] = useState(initialCheckOut);
    const [currentAdults, setCurrentAdults] = useState(initialAdults);
    const [currentChildren, setCurrentChildren] = useState(initialChildren);
        
    // Ab searchParamData current states se banega jab modal open hoga
    const searchParamData = { 
        location: currentLocation, 
        checkIn: currentCheckIn, 
        checkOut: currentCheckOut, 
        adults: currentAdults, 
        children: currentChildren 
    };
    
    // Original URL params (API call ke liye, jo URL mein hain)
    const location = searchParams.get("location") || "";
    const checkIn = searchParams.get("checkIn") || "";
    const checkOut = searchParams.get("checkOut") || "";
    const adults = searchParams.get("adults") || "2";
    const children = searchParams.get("children") || "0";

    // --- Handlers (Modal & Booking) ---
    // Naya Handler function for Policy Modal
const handleOpenPolicyModal = () => { setIsPolicyModalOpen(true); };
const handleClosePolicyModal = () => { setIsPolicyModalOpen(false); };
// ... handleBookNow and other handlers
    const handleOpenModal = (roomData: any) => { setSelectedRoom(roomData); setIsModalOpen(true); };
    const handleCloseModal = () => { setIsModalOpen(false); setSelectedRoom(null); };
    
  
    const handleCloseAvailabilityCheck = () => { setIsAvailabilityCheckOpen(false); setRoomForCheck(null); }; 


    
    const handleProceedToPayment = (roomData: any) => { 
        const roomDetails = {
            roomId: roomData.id, roomName: roomData.room_type, retailPrice: roomData.price.retail_price, 
            taxPrice: roomData.price.retail_tax_price, checkIn: checkIn, checkOut: checkOut,
        };
        const queryString = new URLSearchParams(roomDetails).toString();
        navigate(`/booking?${queryString}`);
        
      
        handleCloseAvailabilityCheck(); 
    };
    
  
    const handleBookNow = (roomData: any) => { 
        handleProceedToPayment(roomData);
    };
    
    // ✅ NEW: Function to trigger a fresh search
    const handleSearch = () => {
        const newSearchParams = new URLSearchParams({
            location: currentLocation,
            checkIn: currentCheckIn,
            checkOut: currentCheckOut,
            adults: currentAdults,
            children: currentChildren,
        }).toString();
        
        // Navigate back to listing page with new parameters
        navigate(`/hotellists?${newSearchParams}`);
    };

    // --- Data Fetching (Fetch Hotel Details ONLY) ---
    useEffect(() => {
        const fetchHotelData = async () => {
            if (!hotelId) { setError('No hotel ID provided'); setLoading(false); return; }
            
            const token = localStorage.getItem('shineetrip_token');
            
            // Mandatory Token Check 
            if (!token) {
                console.error("Authorization Required: Token missing. Redirecting to home/login.");
                setError("You must be logged in to view property details.");
                setLoading(false);
                navigate('/'); 
                return; 
            }
            
            try {
                const response = await fetch(`http://46.62.160.188:3000/properties/${hotelId}`, {
                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                });
                
                if (!response.ok) {
                    const errorStatus = response.status;
                    if (errorStatus === 403 || errorStatus === 401) {
                        localStorage.removeItem('shineetrip_token'); 
                        navigate('/'); 
                        throw new Error("Session expired. Please log in again.");
                    }
                    throw new Error(`Failed to fetch hotel data: ${errorStatus}`);
                }
                
                const data = await response.json();
                setHotelData(data);
                setLoading(false);
            } catch (err) { 
                setError(err instanceof Error ? err.message : 'Failed to load hotel data'); 
                setLoading(false); 
            }
        };
        fetchHotelData();
    }, [hotelId, navigate]);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    // --- Conditional Render (Pre-JSX Checks) ---
    const token = localStorage.getItem('shineetrip_token');
    
    // Check if redirect was triggered (token missing but not loading anymore)
    if (!token && !loading && !hotelData) {
        return (
            <div className="min-h-screen bg-gray-50 font-opensans pt-[116px] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Please log in to access this page.</p>
                </div>
            </div>
        );
    }
    
    // 1. Loading State UI
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

    // 2. Error/Data Not Found State UI
    if (error || !hotelData) {
        return (
            <div className="min-h-screen bg-gray-50 font-opensans pt-[116px] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error || 'Hotel not found'}</p>
                    <button onClick={() => window.history.back()} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                        Go Back
                    </button>
                </div>
            </div>
        );
    }
    
    // --- Data Calculation (Only runs if data is available) ---
    const hotelImages = hotelData?.images?.map((img: any) => img.image) || []; 
    const roomTypes = hotelData?.roomTypes?.filter((room: any) => room.show_front_office && room.is_active) || [];

    // --- Main Component Render ---
    return (
        <div className="min-h-screen bg-gray-50 font-opensans pt-[116px]">
            {/* FULL SEARCH BAR & PROGRESS STEPS UI */}
            <div className="bg-white border-b border-gray-200 pt-6 sticky top-[90px] z-20 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-3">
                    {/* Search Fields (Now Editable) */}
                    <div className="flex items-center justify-center gap-0 mb-4">
                        {/* Location Field */}
                        <div className="flex-1 max-w-[250px] bg-gray-200 px-6 py-2 border-r border-gray-300">
                            <div className="text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">
                                CITY, AREA OR PROPERTY
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-[#D2A256]" />
                                {/* ✅ Editable Input */}
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
                        <div className="flex-1 max-w-[200px] bg-gray-200 px-6 py-2 border-r border-gray-300">
                            <div className="text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">
                                CHECK-IN
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[#D2A256]" />
                                {/* ✅ Editable Input (Date type for consistency) */}
                                <input 
                                    type="date" 
                                    value={currentCheckIn} 
                                    onChange={(e) => setCurrentCheckIn(e.target.value)}
                                    className="text-base font-normal text-gray-900 bg-transparent w-full focus:outline-none"
                                />
                            </div>
                        </div>
        
                        {/* Check-out Field */}
                        <div className="flex-1 max-w-[200px] bg-gray-200 px-6 py-2 border-r border-gray-300">
                            <div className="text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">
                                CHECK-OUT
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[#D2A256]" />
                                {/* ✅ Editable Input (Date type for consistency) */}
                                <input 
                                    type="date" 
                                    value={currentCheckOut} 
                                    onChange={(e) => setCurrentCheckOut(e.target.value)}
                                    className="text-base font-normal text-gray-900 bg-transparent w-full focus:outline-none"
                                />
                            </div>
                        </div>
        
                        {/* Room & Guest Field & Search Button */}
                        <div className="flex-1 max-w-[280px] bg-gray-200 px-6 py-2 flex items-center justify-between gap-4">
                            <div>
                                <div className="text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">
                                    ROOM & GUEST
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-[#D2A256]" />
                                    {/* ✅ Editable Guest Count (Simple input, ideally a modal/stepper is better) */}
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
                            {/* Search Button - Triggers navigation to Hotel Listing Page */}
                            <button 
                                onClick={handleSearch} // ✅ Navigate to hotel listing with new params
                                className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-colors shadow-md"
                            >
                                <Search className="w-4 h-4" />
                            </button>
                        </div>
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
            <div className="max-w-7xl mx-auto px-6 pb-8">
                {/* Hotel Header */}
                <div className="mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">{hotelData?.name}</h1> 
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <span>{hotelData?.city || location}</span> 
                        <span>|</span>
                        <span>1.5km drive to {hotelData?.address}</span>
                    </div>
                </div>
                
                <button 
                  onClick={handleOpenPolicyModal}
                  className="mb-6 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
                  >
                  View Hotel Policies & Rules
                  </button>

                {/* Room Types - Using imported RoomCard */}
                <div className="mb-8">
                    {roomTypes.length > 0 ? (
                        roomTypes.map((room: any) => (
                            <RoomCard 
                                key={room.id} 
                                room={room} 
                                hotelImages={hotelImages} 
                                onMoreInfoClick={handleOpenModal} 
                                onBookNowClick={handleBookNow} 
                                // ✅ POLICY HANDLER PASSED
                                onPolicyClick={handleOpenPolicyModal} 
                            />
                        ))
                    ) : (
                        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                            <p className="text-gray-600">No rooms available at this time.</p>
                        </div>
                    )}
                </div>

                {/* GUEST FAVORITE REVIEWS SECTION */}
                {hotelIdNumber && <HotelReviews hotelId={hotelIdNumber} />}
                
            </div>
            
            {/* 1. Room Details Modal Render */}
            {selectedRoom && (
                <RoomDetailsModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    roomName={selectedRoom.room_type || 'Room Details'}
                    roomImages={hotelImages} roomData={undefined}                />
            )}
            
            {/* 2. Availability Check Modal Render */}
            {roomForCheck && (
                <AvailabilityCheckModal
                    isOpen={isAvailabilityCheckOpen}
                    onClose={handleCloseAvailabilityCheck}
                    roomData={roomForCheck}
                    searchParams={searchParamData}
                    onProceed={handleProceedToPayment}
                />
            )}
            {/* 3. ✅ NEW: Policy Modal Render */}
            {isPolicyModalOpen && hotelData && (
                <PolicyModal
                    isOpen={isPolicyModalOpen}
                    onClose={handleClosePolicyModal}
                    hotelName={hotelData.name || 'Selected Property'}
                    policiesHTML={hotelData.policies || ''}       // Data source: hotelData
                    refundRulesHTML={hotelData.refundRules || ''} // Data source: hotelData
                />
            )}
        </div>
    );
}