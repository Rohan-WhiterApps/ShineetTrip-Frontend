import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Loader2, ShoppingBag, Search, 
    CheckCircle, Clock, ArrowLeft, Star, FileText,
    User, XCircle
} from 'lucide-react';
import { format } from 'date-fns'; 

// --- Interfaces Fixed based on API Response ---

interface PropertyDetails {
    id: number;
    name: string;
    city: string;
    images?: { image: string }[]; // Optional chain safely
}

interface RoomTypeDetails {
    id: number;
    room_type: string;
    images?: { image: string }[];
}

interface OrderRoomDetail {
    id: number;
    checkIn: string;
    checkOut: string;
    adults: number; 
    children: number;
    roomPrice: number; 
    status: string;
    property: PropertyDetails; 
    roomType: RoomTypeDetails; 
}

interface Order {
    id: number;
    status: string; 
    totalPrice: number;
    currency: string;
    createdAt: string;
    orderRooms: OrderRoomDetail[];
}

// --- Helper Functions ---
const formatDayAndDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    try {
        return format(new Date(dateStr), 'E, dd MMM');
    } catch {
        return dateStr;
    }
};

const formatShortDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    try {
        return format(new Date(dateStr), 'dd MMM');
    } catch {
        return dateStr;
    }
};

// Fixed Status Pill to match API Strings like "Complete payment received"
const BookingStatusPill: React.FC<{ status: string }> = ({ status }) => {
    const lowerStatus = status.toLowerCase();
    let Icon = CheckCircle;
    let text = status; 
    let colorClass = 'text-gray-600';

    if (lowerStatus.includes('complete') || lowerStatus.includes('confirmed') || lowerStatus.includes('received')) {
        Icon = CheckCircle;
        text = 'Confirmed';
        colorClass = 'text-green-600';
    } 
    else if (lowerStatus.includes('awaiting') || lowerStatus.includes('pending')) {
        Icon = Clock;
        text = 'Payment Pending';
        colorClass = 'text-yellow-600';
    } 
    else if (lowerStatus.includes('cancelled') || lowerStatus.includes('fail')) {
        Icon = XCircle;
        text = 'Cancelled';
        colorClass = 'text-red-600';
    }

    return (
        <div className={`flex items-center gap-1 text-sm font-semibold ${colorClass}`}>
            <Icon className="w-4 h-4 fill-current" />
            <span>{text}</span>
        </div>
    );
};

const ProfileNavItem: React.FC<{ icon: React.ElementType, label: string, active?: boolean, onClick: () => void }> = ({ icon: Icon, label, active = false, onClick }) => (
    <button onClick={onClick} className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
        active ? 'bg-[#D2A256] text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
    }`}>
        <Icon className="w-5 h-5" />
        <span className="font-medium text-sm">{label}</span>
    </button>
);

const BookingDetailModal = ({ isOpen, onClose, data }: { isOpen: boolean, onClose: () => void, data: {order: Order, room: OrderRoomDetail} | null }) => {
    if (!isOpen || !data) return null;
    const { order, room } = data;

    return (
        <div className="fixed  inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white mt- rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="bg-[#D2A256] p-4 text-white flex justify-between items-center">
                    <h2 className="text-xl font-bold">Booking Details</h2>
                    <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                        <XCircle className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                    {/* Status & Order ID */}
                    <div className="flex justify-between items-start border-b pb-4">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Order ID</p>
                            <p className="font-mono text-lg text-gray-800">#{order.id}</p>
                        </div>
                        <div className="text-right">
                            <BookingStatusPill status={order.status} />
                            <p className="text-xs text-gray-400 mt-1">Booked on {formatShortDate(order.createdAt)}</p>
                        </div>
                    </div>

                    {/* Hotel Info */}
                    <div className="flex gap-4">
                        <img 
                            src={room.property.images?.[0]?.image || "https://placehold.co/100x100?text=Hotel"} 
                            className="w-20 h-20 rounded-lg object-cover border" 
                            alt="hotel"
                        />
                        <div>
                            <h3 className="font-bold text-gray-900">{room.property.name}</h3>
                            <p className="text-sm text-gray-600 line-clamp-2">{room.property.city}, Maharashtra</p>
                            <p className="text-xs text-[#D2A256] font-semibold mt-1">Room: {room.roomType.room_type}</p>
                        </div>
                    </div>

                    {/* Stay Details */}
                    <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold">Check-In</p>
                            <p className="text-sm font-bold text-gray-700">{formatDayAndDate(room.checkIn)}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-gray-400 uppercase font-bold">Check-Out</p>
                            <p className="text-sm font-bold text-gray-700">{formatDayAndDate(room.checkOut)}</p>
                        </div>
                        <div className="pt-2">
                            <p className="text-[10px] text-gray-400 uppercase font-bold">Guests</p>
                            <p className="text-sm font-bold text-gray-700">{room.adults} Adults, {room.children} Child</p>
                        </div>
                    </div>

                    {/* Pricing breakdown */}
                    <div className="space-y-2">
                        <p className="text-sm font-bold text-gray-800 border-b pb-1">Price Summary</p>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Room Price</span>
                            <span>{order.currency} {room.roomPrice}</span>
                        </div>
                        <div className="flex justify-between text-base font-extrabold text-gray-900 pt-2 border-t">
                            <span>Total Paid</span>
                            <span className="text-green-600">{order.currency} {order.totalPrice}</span>
                        </div>
                    </div>

                    {/* Policies / Help */}
                    <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                        <p className="text-xs text-yellow-800 leading-relaxed italic">
                            * Please carry a valid Govt. ID during check-in. PAN card is not accepted.
                        </p>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 bg-gray-50 flex gap-3">
                   <button 
    onClick={() => handleDownloadPDF(order, room)}
    className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-black transition-all"
>
    <FileText className="w-4 h-4" /> Download PDF
</button>
                    <a href={`tel:${room.property?.id}`} className="flex-1 flex items-center justify-center gap-2 border border-gray-300 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-100 transition-all text-gray-700">
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
};

const handleDownloadPDF = (order: Order, room: OrderRoomDetail) => {
    // Ye function ek temporary print window kholega jisme sirf invoice details hongi
    const printContent = `
        <html>
            <head>
                <title>Invoice - Order #${order.id}</title>
                <style>
                    body { font-family: sans-serif; padding: 40px; }
                    .header { border-bottom: 2px solid #D2A256; padding-bottom: 20px; margin-bottom: 20px; }
                    .row { display: flex; justify-content: space-between; margin-bottom: 10px; }
                    .bold { font-weight: bold; }
                    .footer { margin-top: 50px; font-size: 12px; color: #666; text-align: center; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>ShineeTrip Booking Confirmation</h1>
                    <p>Order ID: #${order.id} | Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div class="section">
                    <h3>Hotel Details</h3>
                    <p class="bold">${room.property.name}</p>
                    <p>${room.property.city}</p>
                </div>
                <div class="section">
                    <h3>Stay Details</h3>
                    <div class="row"><span>Check-in:</span> <span class="bold">${room.checkIn}</span></div>
                    <div class="row"><span>Check-out:</span> <span class="bold">${room.checkOut}</span></div>
                    <div class="row"><span>Room Type:</span> <span>${room.roomType.room_type}</span></div>
                    <div class="row"><span>Guests:</span> <span>${room.adults} Adults, ${room.children} Children</span></div>
                </div>
                <div class="section" style="margin-top: 30px; background: #f9f9f9; padding: 15px;">
                    <div class="row" style="font-size: 18px;">
                        <span class="bold">Total Paid:</span>
                        <span class="bold" style="color: green;">${order.currency} ${order.totalPrice}</span>
                    </div>
                </div>
                <div class="footer">
                    <p>Thank you for booking with ShineeTrip. Please present this at the time of check-in.</p>
                </div>
            </body>
        </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print(); // Ye print dialog box open kar dega jahan se user "Save as PDF" kar sakta hai
    }
};

const MyBookingsPage: React.FC = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState('all'); 
    const [selectedBooking, setSelectedBooking] = useState<{order: Order, room: OrderRoomDetail} | null>(null);
const [isModalOpen, setIsModalOpen] = useState(false);

const openDetails = (order: Order, room: OrderRoomDetail) => {
    setSelectedBooking({ order, room });
    setIsModalOpen(true);
};
    
    const customerDbId = localStorage.getItem('shineetrip_db_customer_id');
    const token = localStorage.getItem('shineetrip_token');
    const API_BASE = 'http://46.62.160.188:3000';

    const fetchOrders = useCallback(async () => {
        if (!customerDbId || !token) {
            setError("Authorization required. Please log in.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        
        try {
            const apiUrl = `${API_BASE}/order/search?customerId=${customerDbId}`;
            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                if (response.status === 401) { navigate('/'); return; }
                throw new Error("Failed to fetch bookings.");
            }

            const data: Order[] = await response.json();
            // Sorting by date (Newest first)
            const sortedData = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setOrders(sortedData); 

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load bookings.');
        } finally {
            setLoading(false);
        }
    }, [customerDbId, token, navigate]); 

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);
    
    // Fixed Filtering Logic to match Partial Strings
    const filteredOrders = orders.filter(order => {
        if (filterStatus === 'all') return true;
        if (filterStatus === 'confirmed') return order.status.toLowerCase().includes('complete') || order.status.toLowerCase().includes('received');
        if (filterStatus === 'awaiting payment') return order.status.toLowerCase().includes('awaiting');
        return order.status.toLowerCase().includes(filterStatus.toLowerCase());
    });

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Loader2 className="w-8 h-8 animate-spin text-[#D2A256]" />
            <p className="ml-3">Loading your bookings...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="max-w-7xl mt-16 mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <h3 className="text-xl font-bold mb-4 border-b pb-2">Profile</h3>
                        <div className="space-y-1">
                            <ProfileNavItem icon={User} label="About me" onClick={() => navigate('/profile')} />
                            <ProfileNavItem icon={ShoppingBag} label="My booking" active={true} onClick={() => navigate('/mybooking')} />
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">
                    <h1 className="text-3xl font-extrabold flex items-center gap-2">
                        My Bookings <ShoppingBag className="w-7 h-7 text-[#D2A256]" />
                    </h1>
                    
                    {/* Filters */}
                    <div className="flex items-center bg-white p-4 rounded-xl shadow-sm border gap-3">
                        {['all', 'awaiting payment', 'confirmed', 'cancelled'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                                    filterStatus === status 
                                    ? 'bg-[#D2A256] text-white border-[#D2A256]' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {status.toUpperCase()}
                            </button>
                        ))}
                        <Search className="w-5 h-5 text-gray-400 ml-auto" />
                    </div>

                    {/* Booking Cards */}
                    <div className="space-y-6">
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map(order => (
                                order.orderRooms?.map(room => (
                                    <div key={room.id} className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <BookingStatusPill status={order.status} /> 
                                            <span className='text-gray-500 text-sm'>• Out: {formatDayAndDate(room.checkOut)}</span>
                                        </div>

                                        <div className="flex gap-5 border-b pb-5">
                                            {/* Robust Image Logic */}
                                            <img
                                                src={room.property.images?.[0]?.image || "https://placehold.co/400x400?text=No+Image"}
                                                alt="Hotel"
                                                className="w-28 h-28 object-cover rounded-xl"
                                                onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/400x400?text=Hotel" }}
                                            />

                                            <div className="flex-1">
    <h3 className="text-xl font-bold">{room.property.name}</h3>
    <p className="text-sm text-gray-500">{room.property.city}</p>
    
    {/* Yahan grid ki jagah flex-col use kiya hai taaki items upar-neeche aayein */}
    <div className="mt-3 flex flex-col gap-1 text-sm">
        <p>Room: <span className='font-semibold'>{room.roomType.room_type}</span></p>
        <p>Guests: <span className='font-semibold'>{room.adults} Adults</span></p>
        <p className='text-[#D2A256] font-bold mt-1'>
            {formatShortDate(room.checkIn)} - {formatShortDate(room.checkOut)}
        </p>
    </div>
</div>
                                        </div>
                                        
                                        {/* Buttons */}
                                        <div className='pt-4 flex flex-wrap gap-3'>
                                            <button 
                                                onClick={() => navigate(`/hotel/${room.property.id}`)}
                                                className="flex-1 bg-white border border-[#D2A256] text-[#D2A256] py-2 rounded-lg text-sm font-bold hover:bg-yellow-50"
                                            >
                                                Book Again
                                            </button>
                                            <button 
    onClick={() => openDetails(order, room)}
    className="flex-1 border border-gray-400 text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100"
>
    View Details
</button>
                                            <button className="flex-1 border border-gray-300 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                                                <FileText className='w-4 h-4'/> Invoice
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ))
                        ) : (
                            <div className="text-center p-20 bg-white rounded-xl border-2 border-dashed">
                                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 font-medium">No bookings found for this category.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <BookingDetailModal 
    isOpen={isModalOpen} 
    onClose={() => setIsModalOpen(false)} 
    data={selectedBooking} 
/>
        </div>
    );
};




export default MyBookingsPage;