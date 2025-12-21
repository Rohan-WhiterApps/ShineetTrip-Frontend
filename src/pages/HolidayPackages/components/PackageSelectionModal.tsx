import { X, ChevronRight } from "lucide-react";

export const PackageSelectionModal = ({ isOpen, onClose, data }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-t-[30px] md:rounded-[30px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-blue-50 bg-[#F0F7FF]">
          <h3 className="font-bold text-gray-800 text-lg">{data.title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          
          {/* Option 1: With Flight */}
          <div className="group relative border border-gray-100 rounded-[20px] p-5 hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] text-gray-400 font-medium">Starting from . New Delhi</p>
                <h4 className="font-bold text-gray-700 text-lg mt-1">With Flight</h4>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 line-through">₹80,903</p>
                <p className="font-bold text-gray-800 text-xl">
                    ₹ {(data?.price?.flight_price ?? 0).toLocaleString()}/person
                </p>
              </div>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight className="text-[#2EB159]" size={24} />
            </div>
          </div>

          {/* Option 2: Without Flight (Highlighting with Gold/Tan Border as per image) */}
          <div className="group relative border-2 border-[#EAD8B1] bg-[#F9F3E5] rounded-[20px] p-5 hover:bg-[#F1E4C3] transition-all cursor-pointer">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] text-gray-800/60 font-medium">Starting from . New Delhi</p>
                <h4 className="font-bold text-gray-800 text-lg mt-1">Without Flight</h4>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-800/40 line-through">₹24,903</p>
                <p className="font-bold text-gray-900 text-xl">₹ {(data?.price?.base_fare ?? 0).toLocaleString()}/person
                </p>
              </div>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <ChevronRight className="text-[#2EB159]" size={24} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};