import { useState } from "react";
import { MapPin, Calendar, Users, Search, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

import bannervideo from "../../assets/banner-video.mp4"


export default function HeroSection() {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [activeTab, setActiveTab] = useState("Beach Vacations");
  const [slideIndex, setSlideIndex] = useState(0);
  const [location, setLocation] = useState("");
  const [showSearchCard, setShowSearchCard] = useState(false);

  const tabs = ["Beach Vacations", "Weekend Getaway", "Mountains Calling", "Royal Stay", "Party Destinations", "Pilgrims Stays"];

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

  const visibleDestinations = currentDestinations.slice(slideIndex * cardsPerSlide, slideIndex * cardsPerSlide + cardsPerSlide);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* VIDEO HERO SECTION */}
      <div className="relative w-full h-screen overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={bannervideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <div className="text-center max-w-4xl">
            <h1 className="text-white text-6xl md:text-8xl font-bold mb-6 tracking-tight leading-tight">
              Explore the World<br />Your Way
            </h1>
            <p className="text-white/90 text-xl md:text-3xl mb-12 font-light">
              Discover breathtaking destinations and create memories that last forever
            </p>
            <button 
              onClick={() => setShowSearchCard(true)} 
              className="bg-[#C49C4E] hover:bg-yellow-700 text-white font-bold px-16 py-5 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 text-xl"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* SEARCH CARD MODAL */}
      {showSearchCard && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4 backdrop-blur-sm">
          <div className="w-full max-w-5xl bg-white rounded-3xl p-8 shadow-2xl relative">
            <button 
              onClick={() => setShowSearchCard(false)} 
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ✕
            </button>

            <div className="mb-6">
              <h2 className="text-gray-900 text-4xl font-bold mb-2">Plan Your Journey</h2>
              <p className="text-gray-600 text-lg">Select your travel dates and destination to find the perfect getaway</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="flex items-center gap-2 text-gray-700 text-sm font-semibold mb-2">
                  <MapPin size={18} className="text-yellow-600" />
                  LOCATION
                </label>
                <input 
                  type="text" 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)} 
                  placeholder="Enter destination" 
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 text-base focus:ring-2 focus:ring-yellow-600 focus:border-transparent focus:outline-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-700 text-sm font-semibold mb-2">
                  <Calendar size={18} className="text-yellow-600" />
                  CHECK-IN
                </label>
                <input 
                  type="date" 
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-base focus:ring-2 focus:ring-yellow-600 focus:border-transparent focus:outline-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-700 text-sm font-semibold mb-2">
                  <Calendar size={18} className="text-yellow-600" />
                  CHECK-OUT
                </label>
                <input 
                  type="date" 
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-base focus:ring-2 focus:ring-yellow-600 focus:border-transparent focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div>
                <label className="flex items-center gap-2 text-gray-700 text-sm font-semibold mb-2">
                  <Users size={18} className="text-yellow-600" />
                  ADULTS
                </label>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setAdults(Math.max(1, adults - 1))} 
                    className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-900 text-xl font-bold"
                  >
                    -
                  </button>
                  <div className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-center text-lg font-semibold">
                    {adults}
                  </div>
                  <button 
                    onClick={() => setAdults(adults + 1)} 
                    className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-900 text-xl font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-700 text-sm font-semibold mb-2">
                  <Users size={18} className="text-yellow-600" />
                  CHILDREN
                </label>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setChildren(Math.max(0, children - 1))} 
                    className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-900 text-xl font-bold"
                  >
                    -
                  </button>
                  <div className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-center text-lg font-semibold">
                    {children}
                  </div>
                  <button 
                    onClick={() => setChildren(children + 1)} 
                    className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-900 text-xl font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold px-12 py-4 rounded-full shadow-lg flex items-center gap-3 text-lg transform hover:scale-105 transition-all">
                <Search size={20} />
                Search Packages
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DESTINATIONS SECTION */}
      <div className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="bg-white rounded-3xl shadow-xl p-10">
            <div className="flex items-center gap-8 mb-10 border-b border-gray-200 overflow-x-auto pb-4">
              {tabs.map((tab) => (
                <button 
                  key={tab} 
                  onClick={() => { setActiveTab(tab); setSlideIndex(0); }} 
                  className={`text-lg font-bold relative whitespace-nowrap pb-2 transition-colors ${activeTab === tab ? "text-yellow-600" : "text-gray-500 hover:text-gray-700"}`}
                >
                  {tab}
                  {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-600 rounded-full" />}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {visibleDestinations.map((dest, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-4 shadow-lg">
                    <img 
                      src={dest.image} 
                      alt={dest.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-3xl font-bold drop-shadow-lg">{dest.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button 
                onClick={handlePrev} 
                className="w-14 h-14 bg-gray-100 hover:bg-yellow-600 hover:text-white rounded-full flex items-center justify-center transition-all shadow-md"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={handleNext} 
                className="w-14 h-14 bg-gray-100 hover:bg-yellow-600 hover:text-white rounded-full flex items-center justify-center transition-all shadow-md"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#C49C4E]  py-5 shadow-lg rounded-xl mt-6 w-full max-w-6xl mx-auto">
             <div className="grid grid-cols-4 divide-x divide-gray-200">
               {[
                 ["50+", "Destinations"],
                ["10K+", "Travellers"],
                 ["15+", "Years"],
                 ["100%", "Satisfaction"],
               ].map(([num, label], i) => (
                 <div key={i} className="text-center px-3">
                  <div className="text-xl font-bold text-white mb-0.5">
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
      
   
  );
}