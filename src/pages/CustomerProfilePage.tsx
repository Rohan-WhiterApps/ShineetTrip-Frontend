import React, { useState, useEffect, useCallback } from 'react';
import { User, Mail, Phone, MapPin, Loader2, LogOut, Edit3, Heart, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Interface for Customer Data (Jo hum backend se expect karte hain)
interface CustomerData {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address?: string; 
    firebase_uid: string;
}

const CustomerProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState<CustomerData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch karne ke liye hum Customer ID aur Token Local Storage se lenge
    const customerDbId = localStorage.getItem('shineetrip_db_customer_id');
    const token = localStorage.getItem('shineetrip_token');

    const fetchProfileData = useCallback(async () => {
        if (!customerDbId || !token) {
            setError("Authorization required. Please log in.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // API call to fetch customer details by ID
            const apiUrl = `http://46.62.160.188:3000/customers/${customerDbId}`;

            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                // If token is invalid or user not found, log out
                handleLogout();
                throw new Error("Failed to fetch profile. Session expired.");
            }

            const data = await response.json();
            setCustomer(data as CustomerData);

        } catch (err) {
            console.error("Profile fetch error:", err);
            setError(err instanceof Error ? err.message : 'Failed to load user profile.');
        } finally {
            setLoading(false);
        }
    }, [customerDbId, token, navigate]); 

    useEffect(() => {
        fetchProfileData();
    }, [fetchProfileData]);
    
    // --- Handlers ---
    const handleLogout = () => {
        localStorage.removeItem('shineetrip_token');
        localStorage.removeItem('shineetrip_uid');
        localStorage.removeItem('shineetrip_db_customer_id');
        localStorage.removeItem('shineetrip_name');
        localStorage.removeItem('shineetrip_email');
        navigate('/'); // Redirect to home page
    };
    
    // --- UI RENDER ---

    if (loading) {
        return (
            <div className="min-h-screen pt-28 flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-[#D2A256]" />
                <p className="text-gray-600 ml-3">Loading profile data...</p>
            </div>
        );
    }

    if (error || !customer) {
        // ... (Error UI remains same for clarity) ...
        return (
            <div className="min-h-screen pt-28  flex flex-col items-center justify-center text-center bg-gray-50">
                <p className="text-red-600 mb-4">{error || "Could not load user profile. Please log in again."}</p>
                <button onClick={handleLogout} className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    <LogOut className="w-4 h-4 inline mr-2" /> Log Out
                </button>
            </div>
        );
    }

    // --- Profile Display ---
    return (
        <div className="min-h-screen bg-gray-50 font-opensans pt-28 pb-12">
            <div className="max-w-3xl mt-32 mx-auto px-4">
                
                {/* Header Section */}
                <div className="flex justify-between items-center mb-10 border-b pb-4">
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        {customer.first_name}'s Profile
                    </h1>
                    {/* <button className="bg-[#D2A256] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#c2934b] transition-colors shadow-md">
                        <Edit3 className="w-4 h-4 inline mr-1" /> Edit Profile
                    </button> */}
                </div>
                
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Column 1: Navigation/Quick Actions */}
                    <div className="md:col-span-1 space-y-4">
                        
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 space-y-2">
                            <h3 className="font-bold text-lg text-gray-900 mb-2">Account</h3>
                            
                            <ProfileNavItem icon={User} label="Personal Details" active={true} />
                            <ProfileNavItem icon={ShoppingBag} label="Booking History" />
                            <ProfileNavItem icon={Heart} label="Wishlist/Favorites" />
                        </div>
                        
                        {/* Logout Button (Moved here for better flow) */}
                        <button onClick={handleLogout} className="w-full bg-red-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors flex items-center justify-center shadow-md">
                            <LogOut className="w-5 h-5 inline mr-2" /> Log Out
                        </button>
                        
                    </div>
                    
                    {/* Column 2/3: Profile Details */}
                    <div className="md:col-span-2 space-y-6">
                        
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 space-y-6">
                            <h3 className="text-xl font-bold text-gray-900 border-b pb-3 mb-4">Personal Information</h3>
                            
                            {/* Data Fields Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                                
                                <ProfileDataField icon={User} label="Name" value={`${customer.first_name} ${customer.last_name}`} color="#D2A256" />
                                <ProfileDataField icon={Mail} label="Email Address" value={customer.email} color="#3B82F6" />
                                <ProfileDataField icon={Phone} label="Phone Number" value={customer.phone || "Not provided"} color="#10B981" />
                                
                                {customer.address && (
                                    <ProfileDataField icon={MapPin} label="Address" value={customer.address} color="#EF4444" />
                                )}
                                
                            </div>
                            
                            <div className="border-t pt-4 text-sm text-gray-500">
                                <p>Customer ID: <span className="font-medium text-gray-800">{customer.id}</span></p>
                            </div>
                            
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Helper Components for Clean Code and Consistent Design ---

// Reusable Component for Data Fields
const ProfileDataField: React.FC<{ icon: React.ElementType, label: string, value: string, color: string }> = ({ icon: Icon, label, value, color }) => (
    <div className="space-y-1">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</p>
        <div className="flex items-center space-x-2">
            <Icon className="w-4 h-4" style={{ color: color }} />
            <p className="text-base font-medium text-gray-800">{value}</p>
        </div>
    </div>
);

// Reusable Component for Side Navigation Items
const ProfileNavItem: React.FC<{ icon: React.ElementType, label: string, active?: boolean }> = ({ icon: Icon, label, active = false }) => (
    <button className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
        active 
        ? 'bg-[#D2A256] text-white shadow-md' 
        : 'text-gray-700 hover:bg-gray-100'
    }`}>
        <Icon className="w-5 h-5" />
        <span className="font-medium text-sm">{label}</span>
    </button>
);

export default CustomerProfilePage;