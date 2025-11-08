import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Menu, Phone, Mail, MapPin } from 'lucide-react';

const Tourspackages = () => {
  const [selectedSort, setSelectedSort] = useState('Most Popular');

  const sortOptions = [
    'Most Popular',
    'Price- Low to high',
    'Price- Low to high',
    'Price- High to low',
    'Best Rated',
    'Lowest Price & Best Rated',
    'Lowest'
  ];

  const packages = Array(8).fill({
    title: 'Romantic Beachfront Goa Retreat',
    rating: '4N/5D',
    features: [
      '4 Start Hotel',
      '2 Activities',
      'Honeymoon Hamper',
      'North Goa Sightseeing'
    ],
    additionalFeatures: [
      'Airport Pickup & Drop',
      'Selected Meals'
    ],
    emiPrice: '1,903',
    totalPrice: '9,953',
    fullPrice: '19,506',
    image: '/api/placeholder/350/250'
  });

  return (
    <div className="min-h-screen mt-16 bg-gray-50">
      {/* Header */}
      

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900">Goa Packages</h1>
          <p className="text-gray-600 text-lg">Experience Beach & Sunsets</p>
        </div>



        {/* Horizontal Scroll Buttons */}
        <div className="relative mb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button className="p-2 bg-white rounded-full shadow border">
              <ChevronLeft size={20} />
            </button>
            {sortOptions.map((option, idx) => (
              <button
                key={idx}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  idx === 0
                    ? 'bg-gray-800 text-white'
                    : 'bg-white border border-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
            <button className="p-2 bg-white rounded-full shadow border">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packages.map((pkg, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Image */}
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop"
                  alt="Goa Beach"
                  className="w-full h-64 object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{pkg.title}</h3>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
                    {pkg.rating}
                  </span>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-4">
                  <div>
                    {pkg.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 mb-1">
                        <span className="text-gray-400 text-xs mt-1">•</span>
                        <span className={`text-sm ${feature.includes('Honeymoon') || feature.includes('North') ? 'text-green-600' : 'text-gray-700'}`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div>
                    {pkg.additionalFeatures.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 mb-1">
                        <span className="text-gray-400 text-xs mt-1">•</span>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-end">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">No Cost EMI at</p>
                    <p className="text-2xl font-bold text-gray-900">₹ {pkg.emiPrice}/month</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-600 font-semibold">₹ {pkg.totalPrice}/person</p>
                    <p className="text-xs text-gray-500">Total Price ₹ {pkg.fullPrice}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tourspackages;