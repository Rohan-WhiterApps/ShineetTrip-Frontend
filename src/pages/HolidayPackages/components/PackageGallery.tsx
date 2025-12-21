import { ImageIcon } from "lucide-react";

// Interface mein onOpenGallery add kiya hai click handling ke liye
interface PackageGalleryProps {
  heroImage: string;
  title: string;
  onOpenGallery: () => void;
}

export const PackageGallery = ({ heroImage, title, onOpenGallery }: PackageGalleryProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Grid structure exactly as per Figma design */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[450px] md:h-[500px]">
        
        {/* Main Hero Image - Left Side */}
        <div className="md:col-span-4 relative rounded-3xl overflow-hidden group">
          <img 
            src={heroImage} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
          />
          {/* Centralized View Gallery Button */}
          <button 
            onClick={onOpenGallery}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#C9A961] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-xl hover:bg-[#b39552] transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <ImageIcon size={18} /> View Gallery
          </button>
        </div>

        {/* Center Image - Activities & Sightseeing */}
        <div className="md:col-span-4 relative rounded-3xl overflow-hidden cursor-pointer group">
          <img 
            src="https://images.unsplash.com/photo-1590050751117-2c819df9e94e" 
            className="w-full h-full object-cover brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700" 
            alt="Activities"
          />
          {/* Bottom text overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
            <span className="text-white font-bold text-lg">Activities & Sightseeing</span>
          </div>
        </div>

        {/* Right Image - Property Photos */}
        <div className="md:col-span-4 relative rounded-3xl overflow-hidden cursor-pointer group">
          <img 
            src="https://images.unsplash.com/photo-1566665797739-1674de7a421a" 
            className="w-full h-full object-cover brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700" 
            alt="Property"
          />
          {/* Bottom text overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
            <span className="text-white font-bold text-lg">Property Photos</span>
          </div>
        </div>
      </div>
    </div>
  );
};