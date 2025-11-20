
import { useState, useEffect, useRef } from "react";
import { MapPin, Calendar, Users, Search, ChevronLeft, ChevronRight, ChevronDown, Minus, Plus, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState("Beach Vacations");
  const [slideIndex, setSlideIndex] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Search Widget State
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTab, setSearchTab] = useState("Hotels");
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  // API & Autocomplete State
  const [availableLocations, setAvailableLocations] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const tabs = ["Beach Vacations", "Weekend Getaway", "Mountains Calling", "Royal Stay", "Party Destinations", "Pilgrims Stays"];
  const searchTabs = ["Hotels", "Flights", "Trains", "Holiday Packages", "Events"];

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
    "Royal Stay": [
      { name: "Udaipur", image: "https://images.unsplash.com/photo-1595265677860-9a3143588571?w=800&q=80" },
      { name: "Jaipur", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80" },
    ],
    "Party Destinations": [
      { name: "Ibiza", image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80" },
      { name: "Las Vegas", image: "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=800&q=80" },
    ],
    "Pilgrims Stays": [
      { name: "Varanasi", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80" },
      { name: "Rishikesh", image: "https://images.unsplash.com/photo-1596021688605-d26b52e8d2e6?w=800&q=80" },
    ],
  };

  const currentDestinations = destinations[activeTab as keyof typeof destinations] || [];
  const cardsPerSlide = 4;
  const maxSlide = Math.ceil(currentDestinations.length / cardsPerSlide) - 1;

  const handlePrev = () => setSlideIndex((p) => (p > 0 ? p - 1 : maxSlide));
  const handleNext = () => setSlideIndex((p) => (p < maxSlide ? p + 1 : 0));

  const visibleDestinations = currentDestinations.slice(slideIndex * cardsPerSlide, slideIndex * cardsPerSlide + cardsPerSlide);

  // Fetch Locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch("http://46.62.160.188:3000/states?isActive=true");
        if (res.ok) {
          const data = await res.json();
          const names = data.map((item: any) => item.name);
          setAvailableLocations(names);
        }
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      }
    };
    fetchLocations();
  }, []);

  // Handle URL Params
  useEffect(() => {
    const widgetState = searchParams.get("searchWidget");
    const type = searchParams.get("type");
    
    if (widgetState === "open") {
      setIsSearchVisible(true);
    } else {
      setIsSearchVisible(false);
    }

    if (type && searchTabs.includes(type)) {
      setSearchTab(type);
    }
  }, [searchParams]);

  // Handle Location Input & Autocomplete
  useEffect(() => {
    if (location) {
      const filtered = availableLocations.filter(loc => 
        loc.toLowerCase().includes(location.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations([]);
    }
  }, [location, availableLocations]);

  // Close suggestions on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const handleSearch = () => {
    const searchData = {
      type: searchTab,
      location,
      checkIn,
      checkOut,
      adults,
      children,
      rooms
    };
    console.log("Search Data:", searchData);
    alert(`Search initiated for ${searchTab} in ${location || "any location"}!`);
  };

  const closeSearchWidget = () => {
    setIsSearchVisible(false);
    setSearchParams({});
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans">
      {/* HERO SECTION */}
      <div className="relative w-full h-[100vh] overflow-hidden">
        {/* Background Image */}
        <img 
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80" 
          alt="Himalayan Landscape" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative z-10 h-full flex flex-col px-4">
          
          {/* Search Widget Container */}
          {isSearchVisible && (
            <div className="w-full max-w-5xl mx-auto bg-black/60 backdrop-blur-md rounded-3xl p-8 text-white relative animate-in fade-in zoom-in duration-300 mt-20">
              
              {/* Close Button */}
              <button 
                onClick={closeSearchWidget}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2 tracking-wide">PLAN YOUR JOURNEY</h2>
                  <p className="text-gray-300 text-sm">Select your travel dates and destination to find the perfect getaway</p>
                </div>
                <button className="flex items-center gap-1 text-[#C9A961] text-sm font-medium hover:text-white transition-colors">
                  Advance Search <ChevronDown size={16} />
                </button>
              </div>

              {/* Inputs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Location */}
                <div className="space-y-2 relative" ref={wrapperRef}>
                  <div className="flex items-center gap-2 text-[#C9A961] text-xs font-bold tracking-wider uppercase">
                    <MapPin size={14} />
                    NAME OF LOCATION
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={location}
                      onFocus={() => setShowSuggestions(true)}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter the location"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#C9A961] transition-colors"
                    />
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                  
                  {/* Autocomplete Dropdown */}
                  {showSuggestions && filteredLocations.length > 0 && (
                    <ul className="absolute z-50 w-full bg-white text-gray-800 rounded-lg mt-1 shadow-xl max-h-60 overflow-y-auto">
                      {filteredLocations.map((loc, index) => (
                        <li 
                          key={index}
                          onClick={() => {
                            setLocation(loc);
                            setShowSuggestions(false);
                          }}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm border-b border-gray-100 last:border-0"
                        >
                          {loc}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Check In */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#C9A961] text-xs font-bold tracking-wider uppercase">
                    <Calendar size={14} />
                    CHECK-IN DATE *
                  </div>
                  <input 
                    type="date" 
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#C9A961] transition-colors"
                  />
                </div>

                {/* Check Out */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#C9A961] text-xs font-bold tracking-wider uppercase">
                    <Calendar size={14} />
                    CHECK-OUT DATE *
                  </div>
                  <input 
                    type="date" 
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#C9A961] transition-colors"
                  />
                </div>
              </div>

              {/* Counters Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* Adults */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#C9A961] text-xs font-bold tracking-wider uppercase">
                    <Users size={14} />
                    ADULTS *
                  </div>
                  <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 flex justify-between items-center">
                    <button onClick={() => setAdults(Math.max(1, adults - 1))} className="text-[#C9A961] hover:text-white"><Minus size={16} /></button>
                    <span className="font-medium">{adults}</span>
                    <button onClick={() => setAdults(adults + 1)} className="text-[#C9A961] hover:text-white"><Plus size={16} /></button>
                  </div>
                </div>

                {/* Children */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#C9A961] text-xs font-bold tracking-wider uppercase">
                    <Users size={14} />
                    CHILDREN
                  </div>
                  <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 flex justify-between items-center">
                    <button onClick={() => setChildren(Math.max(0, children - 1))} className="text-[#C9A961] hover:text-white"><Minus size={16} /></button>
                    <span className="font-medium">{children}</span>
                    <button onClick={() => setChildren(children + 1)} className="text-[#C9A961] hover:text-white"><Plus size={16} /></button>
                  </div>
                </div>

                {/* Rooms */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#C9A961] text-xs font-bold tracking-wider uppercase">
                    <Users size={14} />
                    ROOMS
                  </div>
                  <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 flex justify-between items-center">
                    <button onClick={() => setRooms(Math.max(1, rooms - 1))} className="text-[#C9A961] hover:text-white"><Minus size={16} /></button>
                    <span className="font-medium">{rooms}</span>
                    <button onClick={() => setRooms(rooms + 1)} className="text-[#C9A961] hover:text-white"><Plus size={16} /></button>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                <button 
                  onClick={handleSearch}
                  className="bg-[#C9A961] hover:bg-[#b89851] text-white rounded-lg px-10 py-3 flex items-center gap-2 font-bold shadow-lg transition-all transform hover:scale-105"
                >
                  <Search size={20} />
                  Search
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* COMBINED STATS + CATEGORIES SECTION - Single White Card */}
      <div className="pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 pb-6 pt-20 md:pt-24 -mt-52 relative z-20">
          
            {/* STATS BAR - Overlapping Top Edge */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4">
              <div className="bg-white rounded-full shadow-xl py-4 px-10 flex justify-between items-center border border-gray-100">
                 {[
                   ["50+", "DESTINATIONS"],
                   ["10K+", "HAPPY TRAVELERS"],
                   ["15+", "YEARS EXPERIENCE"],
                   ["100%", "SATISFACTION"],
                 ].map(([num, label], i) => (
                   <div key={i} className={`flex flex-col items-center px-6 ${i !== 3 ? 'border-r border-gray-200' : ''} w-full`}>
                     <div className="text-2xl font-bold text-[#D2A256] mb-1">
                       {num}
                     </div>
                     <div className="text-[10px]  text-gray-500 font-semibold font-opensans tracking-wider">
                       {label}
                     </div>
                   </div>
                 ))}
              </div>
            </div>
          
          {/* Tabs */}
          <div className="flex justify-center mb-4 border-b border-gray-200">
            <div className="flex gap-8 overflow-x-auto no-scrollbar pb-1">
              {tabs.map((tab) => (
                <button 
                  key={tab} 
                  onClick={() => { setActiveTab(tab); setSlideIndex(0); }} 
                  className={`pb-3 whitespace-nowrap transition-all relative font-opensans ${
                    activeTab === tab 
                      ? "text-gray-900" 
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  style={{
                    fontWeight: 500,
                    fontSize: '18px',
                    lineHeight: '20px',
                    letterSpacing: '0px',
                    textAlign: 'center',
                    font : 'semibold'
                  }}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {visibleDestinations.map((dest, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-3xl aspect-[4/3.5] mb-2 shadow-sm">
                    <img 
                      src={dest.image} 
                      alt={dest.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-center text-gray-900 text-xl font-bold">{dest.name}</h3>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-3">
              <button 
                onClick={handlePrev} 
                className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center hover:bg-[#C9A961] hover:text-white transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={handleNext} 
                className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center hover:bg-[#C9A961] hover:text-white transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
