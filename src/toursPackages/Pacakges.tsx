import React from 'react';
import { Home, Calendar, Users, Search, SlidersHorizontal, Briefcase } from 'lucide-react';

interface Package {
  id: number;
  title: string;
  badge: string;
  image: string;
  features: {
    airportPickup: boolean;
    selectedMeals: boolean;
    starHotel: number;
    activities: number;
  };
  location: string;
  amenities: {
    honeymoonHamper: boolean;
    northGoaSightseeing: boolean;
  };
  pricing: {
    emiStartsAt: number;
    totalPrice: number;
    pricePerPerson: number;
  };
}

const packageData: Package = {
  id: 1,
  title: "Romantic Beachfront Goa Retreat",
  badge: "4N/5D",
  image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
  features: {
    airportPickup: true,
    selectedMeals: true,
    starHotel: 4,
    activities: 2,
  },
  location: "Romantic Beachfront Goa Retreat",
  amenities: {
    honeymoonHamper: true,
    northGoaSightseeing: true,
  },
  pricing: {
    emiStartsAt: 1903,
    totalPrice: 19506,
    pricePerPerson: 9953,
  },
};

const PackageCard: React.FC<{ pkg: Package }> = ({ pkg }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
      {/* Image Section */}
      <div className="relative">
        <img 
          src={pkg.image} 
          alt={pkg.title}
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title and Badge */}
        <div className="flex items-start justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900 flex-1">
            {pkg.title}
          </h3>
          <div className="ml-4 border-2 border-blue-600 text-blue-600 px-4 py-1 rounded-lg text-base font-bold">
            {pkg.badge}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-6">
          <div className="flex items-center gap-2.5 text-gray-600">
            <Briefcase className="w-5 h-5 text-gray-500" />
            <span className="text-base">Airport Pickup & Drop</span>
          </div>
          <div className="flex items-center gap-2.5 text-gray-600">
            <Briefcase className="w-5 h-5 text-gray-500" />
            <span className="text-base">Selected Meals</span>
          </div>
          <div className="flex items-center gap-2.5 text-gray-600">
            <Briefcase className="w-5 h-5 text-gray-500" />
            <span className="text-base">{pkg.features.starHotel} Start Hotel</span>
          </div>
          <div className="flex items-center gap-2.5 text-gray-600">
            <Briefcase className="w-5 h-5 text-gray-500" />
            <span className="text-base">{pkg.features.activities} Activities</span>
          </div>
          <div className="flex items-center gap-2.5 text-gray-600">
            <Briefcase className="w-5 h-5 text-gray-500" />
            <span className="text-base">{pkg.features.activities} Activities</span>
          </div>
        </div>

        {/* Location */}
        <div className="text-base font-semibold text-gray-900 mb-6">
          {pkg.location}
        </div>

        {/* Amenities */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
            <Briefcase className="w-5 h-5 text-gray-700" />
            <span className="text-base font-medium text-teal-600">Honeymoon Hamper</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
            <Briefcase className="w-5 h-5 text-gray-700" />
            <span className="text-base font-medium text-teal-600">North Goa Sightseeing</span>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="flex items-end justify-between pt-4">
          <div>
            <div className="text-base text-gray-600 mb-1">No Cost EMI at</div>
            <div className="text-2xl font-bold text-gray-900">
              ₹ {pkg.pricing.emiStartsAt.toLocaleString()}/month
            </div>
          </div>
          <div className="text-right">
            <div className="text-base text-gray-600 mb-2">
              Total Price ₹ {pkg.pricing.totalPrice.toLocaleString()}
            </div>
            <button className="bg-green-500 hover:bg-green-600 text-white text-xl font-bold px-8 py-3 rounded-xl transition-colors">
              ₹{pkg.pricing.pricePerPerson.toLocaleString()}/person
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PackagesPage: React.FC = () => {
  // Create 10 packages for the grid
  const packages = Array(10).fill(packageData).map((pkg, index) => ({
    ...pkg,
    id: index + 1,
  }));

  return (
    <div className="min-h-screen mt-18 bg-gray-50">
      {/* Search Bar Section */}
      <div className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-3">
            {/* Search Container */}
            <div className="flex items-center bg-white border-2 border-gray-200 rounded-full px-6 py-3 shadow-sm">
              {/* Location */}
              <div className="flex items-center gap-2 pr-4 border-r border-gray-200">
                <Home className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-semibold text-gray-800">Goa</span>
              </div>
              
              {/* Date */}
              <div className="flex items-center gap-2 px-4 border-r border-gray-200">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-semibold text-gray-800">11- 16 Nov</span>
              </div>
              
              {/* Guests */}
              <div className="flex items-center gap-2 px-4">
                <Users className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-semibold text-gray-800">3 guests</span>
              </div>
              
              {/* Search Button */}
              <button className="ml-2 bg-yellow-500 hover:bg-yellow-600 rounded-full p-2 transition-colors">
                <Search className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Filters Button */}
            <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors">
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 py-4 px-6">
          <h1 className="text-2xl font-bold text-gray-800">Goa Packages</h1>
          <p className="text-sm text-gray-600 mt-1">Experience Beach & Sunsets</p>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 py-3">
            <div className="flex gap-4 overflow-x-auto">
              {Array(7).fill('Most Popular').map((tab, index) => (
                <button
                  key={index}
                  className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-800 transition-colors"
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackagesPage;