import { Search, MapPin, Calendar, Users } from "lucide-react";

interface HolidaySearchProps {
  isDetailsPage?: boolean;
}

export const HolidaySearch = ({ isDetailsPage = false }: HolidaySearchProps) => {
  return (
    <div className={`w-full transition-all duration-300 ${
      isDetailsPage 
        ? "bg-white py-4" 
        : "-mt-10 relative z-20"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`bg-[#e9e9e9] rounded-full shadow-xl flex items-center p-1 border border-gray-100 ${
          isDetailsPage ? "max-w-5xl mx-auto" : ""
        }`}>
          
          {/* City/Property */}
          <div className="flex-1 flex items-center gap-3 px-6 border-r border-gray-200">
            <div className="p-2 bg-orange-50 rounded-lg">
              <MapPin size={18} className="text-[#C9A961]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">City, Area or Property</span>
              <input 
                type="text" 
                placeholder="Manali" 
                className="text-sm font-bold text-gray-800 focus:outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Check-In */}
          <div className="flex-1 flex items-center gap-3 px-6 border-r border-gray-200 hidden md:flex">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Calendar size={18} className="text-[#C9A961]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Check-In</span>
              <span className="text-sm font-bold text-gray-800 whitespace-nowrap">Fri, 21 Nov 2025</span>
            </div>
          </div>

          {/* Check-Out */}
          <div className="flex-1 flex items-center gap-3 px-6 border-r border-gray-200 hidden md:flex">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Calendar size={18} className="text-[#C9A961]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Check-Out</span>
              <span className="text-sm font-bold text-gray-800 whitespace-nowrap">Fri, 21 Nov 2025</span>
            </div>
          </div>

          {/* Room & Guests */}
          <div className="flex-1 flex items-center gap-3 px-6 hidden lg:flex">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Users size={18} className="text-[#C9A961]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Room & Guest</span>
              <span className="text-sm font-bold text-gray-800 whitespace-nowrap">1 Room, 2 Adult</span>
            </div>
          </div>

          {/* Search Button (Black Circle jaisa image mein hai) */}
          <div className="p-1">
            <button className="bg-black text-white p-4 rounded-full hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};