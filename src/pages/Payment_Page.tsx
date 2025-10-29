import React, { useState } from 'react';
import { ArrowLeft, X, Phone, Mail, Award, Shield, Clock, Edit2 } from 'lucide-react';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
     

      

      {/* Progress Steps */}
      <div className="bg-white py-6 px-6 mb-6">
        <div className="max-w-md mx-auto flex items-center justify-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-medium">
              1
            </div>
            <span className="font-medium">Room 1</span>
          </div>
          <div className="w-32 h-px bg-gray-300"></div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center font-medium">
              2
            </div>
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

              <div className="space-y-4">
                {/* Phone and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex gap-2">
                    <select
                      name="phoneCode"
                      value={formData.phoneCode}
                      onChange={handleInputChange}
                      className="w-24 px-3 py-2.5 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                {/* Title and Names Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="px-4 py-2.5 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-500"
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
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="First Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                {/* GST Number */}
                <input
                  type="text"
                  name="gstNumber"
                  placeholder="GST Number"
                  value={formData.gstNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />

                {/* Special Requests */}
                <textarea
                  name="specialRequests"
                  placeholder="Special Requests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
                />

                {/* Privacy Policy Checkbox */}
                <div className="flex items-start gap-2 pt-2">
                  <input
                    type="checkbox"
                    name="agreePolicy"
                    checked={formData.agreePolicy}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 accent-yellow-600"
                  />
                  <label className="text-sm text-gray-700">
                    I agree to the <a href="#" className="text-blue-600 hover:underline">privacy policy</a>
                  </label>
                </div>

                {/* Submit Button */}
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3.5 rounded-lg mt-4 transition-colors">
                  Confirm & Pay
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
              </div>
            </div>
          </div>

          {/* Right Section - Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Booking Details</h2>
                <span className="text-sm text-green-600 font-medium">You Saved INR 1,225</span>
              </div>

              <div className="space-y-4">
                {/* Room Details */}
                <div className="pb-4 border-b border-gray-200">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <div className="font-medium">Standard Room</div>
                      <div className="text-sm text-gray-600">Room Only -</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit2 size={14} />
                      </button>
                      <span className="font-medium">INR 2,389</span>
                    </div>
                  </div>
                </div>

                {/* Stay Information */}
                <div className="pb-4 border-b border-gray-200">
                  <div className="font-medium mb-3">Stay Information</div>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-gray-600">16-10-2025 - 17-10-2025</span>
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

                {/* Price Breakdown */}
                <div className="space-y-2 pb-4 border-b border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price -</span>
                    <span className="font-medium">INR 2,389</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Taxes & Fees -</span>
                    <span className="font-medium">INR 119</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-xl font-bold text-green-600">INR 2,508</span>
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