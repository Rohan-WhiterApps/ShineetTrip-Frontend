import { useState } from "react";
import {
  MapPin,
  Calendar,
  Users,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

export default function HeroSection() {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [activeTab, setActiveTab] = useState("Beach Vacations");
  const [slideIndex, setSlideIndex] = useState(0);
  const [location, setLocation] = useState("");

  const tabs = [
    "Beach Vacations",
    "Weekend Getaway",
    "Mountains Calling",
    "Royal Stay",
    "Party Destinations",
    "Pilgrims Stays",
  ];

  const destinations = {
    "Beach Vacations": [
      { name: "Maldives", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80" },
      { name: "Goa", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80" },
      { name: "Phuket", image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&q=80" },
      { name: "Bali", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80" },
    ],
    "Weekend Getaway": [
      { name: "Shimla", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80" },
      { name: "Manali", image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80" },
      { name: "Nainital", image: "https://images.unsplash.com/photo-1580837119756-563d608dd119?w=800&q=80" },
    ],
    "Mountains Calling": [
      { name: "Ladakh", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" },
      { name: "Sikkim", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" },
      { name: "Dharamshala", image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&q=80" },
    ],
  };

  const currentDestinations = destinations[activeTab] || [];
  const cardsPerSlide = 3;
  const maxSlide = Math.ceil(currentDestinations.length / cardsPerSlide) - 1;

  const handlePrev = () => setSlideIndex((p) => (p > 0 ? p - 1 : maxSlide));
  const handleNext = () => setSlideIndex((p) => (p < maxSlide ? p + 1 : 0));

  const visibleDestinations = currentDestinations.slice(
    slideIndex * cardsPerSlide,
    slideIndex * cardsPerSlide + cardsPerSlide
  );

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* HERO SECTION */}
      <div
        className="relative w-full h-[900px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        {/* Search Form */}
        <div className="relative z-10 h-full flex flex-col justify-start pt-16">
          <div className="w-full max-w-5xl mx-auto bg-black/40 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/10">
            {/* Header */}
            <div className="text-left mb-5">
              <div className="flex items-center justify-between mb-1">
                <h1 className="text-white text-3xl font-extrabold tracking-wide">
                  PLAN YOUR JOURNEY
                </h1>
                <button className="text-[#C9A961] text-xs font-medium flex items-center gap-1 hover:text-[#b99242] transition">
                  Advance Search <ChevronDown size={14} />
                </button>
              </div>
              <p className="text-gray-300 text-sm">
                Select your travel dates and destination to find the perfect getaway
              </p>
            </div>

            {/* Search Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              {/* Location Input */}
              <div>
                <label className="flex items-center gap-2 text-white text-xs font-semibold mb-2">
                  <MapPin size={16} className="text-[#C9A961]" />
                  LOCATION
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 text-sm focus:ring-1 focus:ring-[#C9A961]"
                />
              </div>

              {/* Dates */}
              <div>
                <label className="flex items-center gap-2 text-white text-xs font-semibold mb-2">
                  <Calendar size={16} className="text-[#C9A961]" /> CHECK-IN
                </label>
                <input
                  type="date"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:ring-1 focus:ring-[#C9A961]"
                  style={{ colorScheme: "dark" }}
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-white text-xs font-semibold mb-2">
                  <Calendar size={16} className="text-[#C9A961]" /> CHECK-OUT
                </label>
                <input
                  type="date"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:ring-1 focus:ring-[#C9A961]"
                  style={{ colorScheme: "dark" }}
                />
              </div>
            </div>

            {/* Guests */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="flex items-center gap-2 text-white text-xs font-semibold mb-2">
                  <Users size={16} className="text-[#C9A961]" /> ADULTS
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-8 h-8 bg-white/10 rounded-md text-white text-base hover:bg-white/20"
                  >
                    -
                  </button>
                  <div className="flex-1 bg-white/10 rounded-md px-3 py-2 text-white text-center text-sm font-medium">
                    {adults}
                  </div>
                  <button
                    onClick={() => setAdults(adults + 1)}
                    className="w-8 h-8 bg-white/10 rounded-md text-white text-base hover:bg-white/20"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-white text-xs font-semibold mb-2">
                  <Users size={16} className="text-[#C9A961]" /> CHILDREN
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className="w-8 h-8 bg-white/10 rounded-md text-white text-base hover:bg-white/20"
                  >
                    -
                  </button>
                  <div className="flex-1 bg-white/10 rounded-md px-3 py-2 text-white text-center text-sm font-medium">
                    {children}
                  </div>
                  <button
                    onClick={() => setChildren(children + 1)}
                    className="w-8 h-8 bg-white/10 rounded-md text-white text-base hover:bg-white/20"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-center mt-4">
              <button className="bg-gradient-to-r from-[#C9A961] to-[#b99242] text-white font-semibold px-8 py-2.5
               rounded-lg shadow-md hover:from-[#b99242] hover:to-[#C9A961] flex items-center gap-2 text-sm">
                <Search size={16} /> Search
              </button>
            </div>
          </div>

          {/* ✅ Stats Banner moved OUTSIDE card */}
          <div className="bg-white py-5 shadow-lg rounded-xl mt-6 w-full max-w-4xl mx-auto">
            <div className="grid grid-cols-4 divide-x divide-gray-200">
              {[
                ["50+", "Destinations"],
                ["10K+", "Travellers"],
                ["15+", "Years"],
                ["100%", "Satisfaction"],
              ].map(([num, label], i) => (
                <div key={i} className="text-center px-3">
                  <div className="text-xl font-bold text-[#C9A961] mb-0.5">
                    {num}
                  </div>
                  <div className="text-[10px] text-gray-600 uppercase tracking-wide">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DESTINATIONS - OVERLAPPING SECTION */}
      <div className="-mt-95 relative z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-10 pb-8">
            {/* Tabs */}
            <div className="flex items-center gap-8 mb-10 border-b border-gray-200 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setSlideIndex(0);
                  }}
                  className={`pb-4 text-base font-bold relative ${
                    activeTab === tab
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                  )}
                </button>
              ))}
            </div>

            {/* Destination Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {visibleDestinations.map((dest, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-4">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 text-center">
                    {dest.name}
                  </h3>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={handlePrev}
                className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center"
              >
                <ChevronLeft size={20} className="text-gray-700" />
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center"
              >
                <ChevronRight size={20} className="text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
