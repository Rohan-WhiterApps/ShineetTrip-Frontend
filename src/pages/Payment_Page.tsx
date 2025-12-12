import React, { useState, useEffect } from 'react';
import { ArrowLeft, X, Phone, Mail, Award, Shield, Clock, Edit2, Loader2 } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom'; // ✅ FIX 1: useNavigate import kiya
import BookingSuccessCard from '../components/ui/BookingSuccessCard'; // ✅ NEW: Success Card Import

// Define global Razorpay object for TypeScript compiler
declare global {
    interface Window {
        Razorpay: any;
    }
}

// Helper to format date
const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch {
        return dateStr;
    }
};

const BookingPage: React.FC = () => {
    const [formData, setFormData] = useState({
        phoneCode: '+91',
        phone: '',
        email: '',
        title: '',
        firstName: '',
        lastName: '',
        gstNumber: '',
        specialRequests: '',
        agreePolicy: false
    });
    
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMessage, setPaymentMessage] = useState('');
    const [isBookingSuccessful, setIsBookingSuccessful] = useState(false); // ✅ NEW State for success card
    const [successOrderId, setSuccessOrderId] = useState(''); // Store the final Order ID
    

    const navigate = useNavigate(); // ✅ FIX 2: useNavigate hook use kiya
    const [searchParams] = useSearchParams();
    const retailPriceStr = searchParams.get('retailPrice') || '0';
    const taxPriceStr = searchParams.get('taxPrice') || '0';
    const roomName = searchParams.get('roomName') || 'Deluxe Room';
    const checkInStr = searchParams.get('checkIn') || '';
    const checkOutStr = searchParams.get('checkOut') || '';
    const roomId = searchParams.get('roomId') || ''; 

    const retailPrice = parseFloat(retailPriceStr);
    const taxPrice = parseFloat(taxPriceStr);
    const finalTotal = taxPrice; 
    const propertyId = searchParams.get('propertyId') || '1'; 

    const token = localStorage.getItem('shineetrip_token');
    const customerIdStr = localStorage.getItem('shineetrip_db_customer_id') || '1'; // Using db customer ID
    if (!customerIdStr || customerIdStr === '1' || isNaN(parseInt(customerIdStr))) {
    setPaymentMessage('Customer profile not loaded. Please log out and log in again.');
    setIsProcessing(false);
    return;
}
    const customerId = parseInt(customerIdStr) || 1; 

    // ✅ FINAL CONFIRMED PUBLIC KEY
    const RAZORPAY_KEY = 'rzp_test_Ri1Lg8tbqZnUaT';

    // API URLS - Confirmed by your Postman testing
    const API_BASE = 'http://46.62.160.188:3000';
    const CREATE_ORDER_URL = `${API_BASE}/order/book-now`;
    const VERIFY_URL = `${API_BASE}/order/success`;
    const FAILURE_URL = `${API_BASE}/order/failure`;
    CREATE_ORDER_URL.trim();

    console.log("Using API Base:", API_BASE);
    console.log("Create Order URL:", CREATE_ORDER_URL);
    
    // --- Core Razorpay Logic ---
    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setPaymentMessage('');

        if (!formData.agreePolicy) {
            setPaymentMessage('You must agree to the privacy policy.');
            return;
        }

        if (finalTotal <= 0) {
            setPaymentMessage('Invalid total price for booking.');
            return;
        }
        
        if (!token || isNaN(customerId)) { // Check if customerId is NaN
             setPaymentMessage('Authorization token or Customer ID missing/invalid. Please log in again.');
             return;
        }

        if (!token) {
    setPaymentMessage('Session expired. Please log in again.');
    navigate('/login'); // ya login modal khol
    return;
}
        
        setIsProcessing(true);
        const amountInPaise = Math.round(finalTotal * 100);

        console.log("Token check before API:", token ? "Token present" : "TOKEN MISSING"); // NEW!
        console.log("Token",token);
console.log("Customer ID check before API:", customerId); // NEW!

        try {
            // Step 1: POST /order/create to generate Razorpay Order ID
            const createOrderPayload = {
                orderRooms: [
                    {
                        propertyId: parseInt(propertyId),
                        roomTypeId: parseInt(roomId),
                        adults: parseInt(searchParams.get('adults') || '2'),
                        children: parseInt(searchParams.get('children') || '0'),
                        checkIn: checkInStr,
                        checkOut: checkOutStr,
                        roomPrice: retailPrice, 
                    }
                ],
                totalPrice: finalTotal,
                paymentMethod: "online",
                currency: "INR",
                notes: { bookingSource: "web-portal-checkout" },
                customerId: customerId, // Using parsed integer customer ID
            };

            console.log("Create Order Payload Sent:", createOrderPayload);
              console.log("Token",token);
console.log("Customer ID check before API:", customerId);

            const orderResponse = await fetch(CREATE_ORDER_URL, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(createOrderPayload),
            });

            const responseText = await orderResponse.text();

            if (!orderResponse.ok) {
                // Detailed error handling for 404/403/Customer Not Found
                let errorMsg = `API failed (${orderResponse.status}).`;
                try {
                    const errorData = JSON.parse(responseText);
                    if (orderResponse.status === 404) {
                         errorMsg = `Error 404: API endpoint not found at ${CREATE_ORDER_URL}.`;
                    } else if (errorData.message) {
                        errorMsg = errorData.message;
                    }
                } catch {
                    errorMsg = `Server Error (${orderResponse.status}).`;
                }
                throw new Error(errorMsg);
            }
            
            const orderData = JSON.parse(responseText);
            const razorpayOrderId = orderData.razorpayOrderId;
            
            setPaymentMessage(`Order ID ${razorpayOrderId} generated. Opening payment gateway...`);
            
            // Step 2: Initialize Razorpay Checkout
            if (typeof window.Razorpay === 'undefined') {
                throw new Error("Razorpay SDK not loaded. Please ensure script tag is in your HTML.");
            }

            const options = {
                key: RAZORPAY_KEY, 
                amount: amountInPaise, 
                currency: "INR",
                name: "Shinee Trip Booking",
                description: `Room Booking: ${roomName}`,
                order_id: razorpayOrderId,
                handler: async function (response: any) {
                    await verifyPayment(response, razorpayOrderId);
                },
                prefill: {
                    name: formData.firstName + ' ' + formData.lastName,
                    email: formData.email,
                    contact: formData.phoneCode + formData.phone,
                },
                theme: { "color": "#D2A256" }
            };

            const rzp1 = new window.Razorpay(options); 
            
            // Handle Payment Failure/Cancellation
            rzp1.on('payment.failed', async function (response: any) {
                setPaymentMessage(`Payment Failed: ${response.error.description}`);
                await markOrderAsFailed(razorpayOrderId, response.error);
                setIsProcessing(false);
            });
            
            rzp1.open(); // Open the payment gateway popup

        } catch (error) {
            setPaymentMessage(error instanceof Error ? error.message : 'An unexpected error occurred during payment.');
            console.error("Payment Initiation Error:", error);
        } finally {
            if (!paymentMessage.includes("Payment Failed") && typeof window.Razorpay === 'undefined') setIsProcessing(false);
        }
    };
    
    // Step 3: Verify Payment Success
    const verifyPayment = async (razorpayResponse: any, orderId: string) => {
        setIsProcessing(true); 
        try {
            // ✅ CRITICAL FIX: Convert snake_case response fields to camelCase for the backend API
            const verificationPayload = {
                razorpayOrderId: orderId, // Already camelCase from 'orderId' variable
                razorpayPaymentId: razorpayResponse.razorpay_payment_id, // FIX: Change to camelCase
                razorpaySignature: razorpayResponse.razorpay_signature, // FIX: Change to camelCase
            };
            
            console.log("Verification Payload Sent:", verificationPayload); // DEBUG

            const verifyResponse = await fetch(VERIFY_URL, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(verificationPayload),
            });
            
            const verificationText = await verifyResponse.text(); // Get full response text for debug

            if (!verifyResponse.ok) {
                // Log the full server response for debugging by backend team
                console.error("Verification Server Response (400/500):", verificationText); // DEBUG
                throw new Error(`Payment verification failed on server. Status: ${verifyResponse.status}. Details: ${verificationText}`); // Include details in error message
            }

            // ✅ SUCCESS STATE CHANGE (Stop automatic navigation)
            setPaymentMessage('Booking successful! Payment successfully verified.');
            setSuccessOrderId(orderId); // Store the final Order ID
            setIsBookingSuccessful(true); // Open the success card

        } catch (error) {
            setPaymentMessage('Payment verification failed. Please contact support. Error: ' + (error instanceof Error ? error.message : 'Unknown verification error.'));
            console.error("Verification Error:", error);
        } finally {
            setIsProcessing(false);
        }
    };
    
    // Step 4: Mark Order as Failed (for cancellation/failure)
    const markOrderAsFailed = async (orderId: string, errorResponse: any) => {
        try {
            await fetch(FAILURE_URL, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId: orderId,
                    errorMessage: errorResponse.description,
                    errorCode: errorResponse.code,
                }),
            });
        } catch (err) {
            console.error("Failed to mark order as failed:", err);
        }
    };
    // --- End Core Razorpay Logic ---


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    return (
        <div className="min-h-screen bg-gray-100 pt-[116px]">
            {/* Render Success Card if successful */}
            {isBookingSuccessful && successOrderId && (
                <BookingSuccessCard roomName={roomName} orderId={successOrderId} />
            )}

            {/* Header / Progress Steps (Unchanged) */}
            <div className="bg-white py-6 px-6 mb-6">
                <div className="max-w-md mx-auto flex items-center justify-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-medium">1</div>
                        <span className="font-medium">Room 1</span>
                    </div>
                    <div className="w-32 h-px bg-gray-300"></div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center font-medium">2</div>
                        <span className="text-gray-500">Reservation</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Section - Guest Details Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm p-8">
                            <h2 className="text-2xl font-semibold mb-6">Guest Details</h2>

                            <form onSubmit={handlePayment} className="space-y-4"> {/* ✅ Form tag added with onSubmit */}
                                {/* Phone and Email Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex gap-2">
                                        <select
                                            name="phoneCode"
                                            value={formData.phoneCode}
                                            onChange={handleInputChange}
                                            className="w-24 px-3 py-2.5 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            disabled={isProcessing}
                                        >
                                            <option>+91</option>
                                            <option>+1</option>
                                            <option>+44</option>
                                        </select>
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Phone Number"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="flex-1 px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            disabled={isProcessing}
                                            required
                                        />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            disabled={isProcessing}
                                        required
                                    />
                                </div>

                                {/* Title and Names Row */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <select
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="px-4 py-2.5 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-500"
                                            disabled={isProcessing}
                                    >
                                        <option value="">Select Title*</option>
                                        <option>Mr.</option>
                                        <option>Mrs.</option>
                                        <option>Ms.</option>
                                    </select>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            disabled={isProcessing}
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            disabled={isProcessing}
                                        required
                                    />
                                </div>

                                {/* GST Number */}
                                <input
                                    type="text"
                                    name="gstNumber"
                                    placeholder="GST Number (Optional)"
                                    value={formData.gstNumber}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    disabled={isProcessing}
                                />

                                {/* Special Requests */}
                                <textarea
                                    name="specialRequests"
                                    placeholder="Special Requests (Optional)"
                                    value={formData.specialRequests}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
                                    disabled={isProcessing}
                                />

                                {/* Privacy Policy Checkbox */}
                                <div className="flex items-start gap-2 pt-2">
                                    <input
                                        type="checkbox"
                                        name="agreePolicy"
                                        checked={formData.agreePolicy}
                                        onChange={handleInputChange}
                                        className="mt-1 w-4 h-4 accent-yellow-600"
                                        disabled={isProcessing}
                                    />
                                    <label className="text-sm text-gray-709">
                                        I agree to the <a href="#" className="text-blue-600 hover:underline">privacy policy</a>
                                    </label>
                                </div>
                                
                                {/* Payment Message/Error Display */}
                                {paymentMessage && (
                                    <div className={`p-3 rounded-lg text-sm font-medium ${paymentMessage.includes('Success') || paymentMessage.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {paymentMessage}
                                    </div>
                                )}


                                {/* Submit Button */}
                                <button 
                                    type="submit"
                                    className={`w-full bg-yellow-600 text-white font-semibold py-3.5 rounded-lg mt-4 transition-colors flex items-center justify-center gap-2 
                                        ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-yellow-700'}`}
                                    disabled={isProcessing || !formData.agreePolicy}
                                >
                                    {isProcessing && <Loader2 className="w-5 h-5 animate-spin" />}
                                    {isProcessing ? 'Processing Payment...' : 'Confirm & Pay'}
                                </button>


                                {/* Trust Badges */}
                                <div className="grid grid-cols-3 gap-4 pt-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Award size={20} />
                                        <span>Best Price guaranteed</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Shield size={20} />
                                        <span>100% secure payment</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock size={20} />
                                        <span>Instant Confirmation</span>
                                    </div>
                                </div>

                                {/* Payment Methods */}
                                <div className="flex justify-center gap-3 pt-6">
                                    <div className="bg-blue-600 text-white px-4 py-2 rounded font-medium text-sm">VISA</div>
                                    <div className="bg-blue-700 text-white px-4 py-2 rounded font-medium text-sm">AMEX</div>
                                    <div className="bg-red-600 text-white px-4 py-2 rounded font-medium text-sm">MC</div>
                                    <div className="bg-orange-500 text-white px-4 py-2 rounded font-medium text-sm">DISC</div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Section - Booking Summary (Unchanged logic) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold">Booking Details</h2>
                                <span className="text-sm text-green-600 font-medium">You Saved INR 1,225</span>
                            </div>

                            <div className="space-y-4">
                                {/* Room Details - Dynamic Data */}
                                <div className="pb-4 border-b border-gray-200">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <div className="font-medium">**{roomName}**</div>
                                            <div className="text-sm text-gray-600">Room Only -</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className="text-gray-400 hover:text-gray-600">
                                                <Edit2 size={14} />
                                            </button>
                                            <span className="font-medium">INR {retailPrice.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Stay Information - Dynamic Data */}
                                <div className="pb-4 border-b border-gray-200">
                                    <div className="font-medium mb-3">Stay Information</div>
                                    <div className="flex justify-between items-center text-sm mb-2">
                                        <span className="text-gray-600">**{formatDate(checkInStr)} - {formatDate(checkOutStr)}**</span>
                                        <button className="text-gray-400 hover:text-gray-600 flex items-center gap-1">
                                            Modify <Edit2 size={12} />
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">2 Adults, 0 Children, 1 Rooms</span>
                                        <button className="text-gray-400 hover:text-gray-600 flex items-center gap-1">
                                            Modify <Edit2 size={12} />
                                        </button>
                                    </div>
                                </div>

                                {/* Price Breakdown - Dynamic Data */}
                                <div className="space-y-2 pb-4 border-b border-gray-200">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Price -</span>
                                        <span className="font-medium">INR {retailPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Taxes & Fees -</span>
                                        <span className="font-medium">INR {(finalTotal - retailPrice).toFixed(0)}</span>
                                    </div>
                                </div>

                                {/* Total - Dynamic Data */}
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-lg font-semibold">Total</span>
                                    <span className="text-xl font-bold text-green-600">INR {finalTotal.toLocaleString()}</span>
                                </div>

                                {/* Cancellation Policy */}
                                <div className="pt-4">
                                    <div className="font-medium text-sm mb-1">Cancellation Policy</div>
                                    <div className="text-xs text-gray-600">
                                        You will be charged the 1st night.{' '}
                                        <a href="#" className="text-blue-600 hover:underline">More info</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;