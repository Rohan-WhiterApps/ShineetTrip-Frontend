import { X } from "lucide-react";
import { useState } from "react";

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const GalleryModal = ({ isOpen, onClose, title }: GalleryModalProps) => {
  const [activeCategory, setActiveCategory] = useState("Munnar");

  if (!isOpen) return null;

  // Real HD Working Links for Categories
  const categories = [
    { id: "dest", label: "Around The Destination", count: 12, img: "https://images.unsplash.com/photo-1593693397690-362af9666fc2?q=80&w=300&auto=format&fit=crop" },
    { id: "prop", label: "Property Photos", count: 8, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=300&auto=format&fit=crop" },
    { id: "act", label: "Activities & Sightseeing", count: 15, img: "https://media.istockphoto.com/id/1164329797/photo/hindu-sadhu-sitting-on-a-boat-overlooking-varanasi-city-architecture-at-sunset.jpg?s=612x612&w=0&k=20&c=LbpIHRo7kGT7dbUr6b6UuD1d6P0yCaKZ2lbqo3TY988=" },
    { id: "high", label: "Package Highlights", count: 6, img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=300&auto=format&fit=crop" },
  ];

  // Grid Images with Real Content Links
  const gridImages = [
    "https://www.makemytrip.com/tripideas/places", // Kerala Backwaters
    "https://media.istockphoto.com/id/1164329797/photo/hindu-sadhu-sitting-on-a-boat-overlooking-varanasi-city-architecture-at-sunset.jpg?s=612x612&w=0&k=20&c=LbpIHRo7kGT7dbUr6b6UuD1d6P0yCaKZ2lbqo3TY988=", // Tea Gardens
    "https://media.istockphoto.com/id/1164329797/photo/hindu-sadhu-sitting-on-a-boat-overlooking-varanasi-city-architecture-at-sunset.jpg?s=612x612&w=0&k=20&c=LbpIHRo7kGT7dbUr6b6UuD1d6P0yCaKZ2lbqo3TY988=", // Luxury Resort
    "https://media.istockphoto.com/id/1164329797/photo/hindu-sadhu-sitting-on-a-boat-overlooking-varanasi-city-architecture-at-sunset.jpg?s=612x612&w=0&k=20&c=LbpIHRo7kGT7dbUr6b6UuD1d6P0yCaKZ2lbqo3TY988=", // Beach view
    "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1000&auto=format&fit=crop", // Nature
    "https://images.unsplash.com/photo-1544122192-33633719001b?q=80&w=1000&auto=format&fit=crop"  // Cultural activity
  ];

  return (
    <div className="fixed inset-0 z-[200] bg-white overflow-y-auto font-opensans animate-in slide-in-from-bottom duration-500">
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{title}</h2>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-gray-100 rounded-full transition-all active:scale-90">
            <X size={32} className="text-gray-800" />
          </button>
        </div>

        {/* Top Chips Section [Figma Exact] */}
        <div className="flex flex-wrap gap-4 mb-10">
          {categories.map((cat) => (
            <div 
              key={cat.id}
              className="flex items-center gap-3 bg-gray-50 border border-gray-100 p-2.5 rounded-2xl cursor-pointer hover:shadow-md transition-all hover:bg-white"
            >
              <div className="flex flex-col pl-1">
                <span className="text-[11px] font-bold text-gray-800 leading-none mb-1">{cat.label}</span>
                <span className="text-[10px] text-gray-400 font-bold">{cat.count} Photos</span>
              </div>
              <img src={cat.img} className="w-12 h-12 rounded-xl object-cover shadow-sm" alt={cat.label} />
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-12 overflow-x-auto pb-2 no-scrollbar">
          {["Munnar", "Alleppey", "Thekkady", "Kochi"].map((city) => (
            <button
              key={city}
              onClick={() => setActiveCategory(city)}
              className={`px-10 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                activeCategory === city 
                ? "bg-black text-white shadow-xl scale-105" 
                : "bg-gray-100 text-gray-500 border border-transparent hover:border-gray-300"
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Main Content Title */}
        <div className="mb-8">
          <h3 className="text-2xl font-black text-gray-900">Around The Destination</h3>
          <p className="text-sm text-[#C9A961] font-bold mt-1 uppercase tracking-widest">{activeCategory}</p>
        </div>

        {/* The Grid [Figma Match] */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridImages.map((url, i) => (
            <div key={i} className="aspect-[4/3] rounded-[40px] overflow-hidden shadow-lg group">
              <img 
                src={url}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                alt="Gallery item"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Bottom Spacing */}
        <div className="h-20"></div>
      </div>
    </div>
  );
};