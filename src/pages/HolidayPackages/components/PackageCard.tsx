import { useState } from "react";
import { Briefcase, Heart, X, ChevronRight } from "lucide-react";

interface PackageCardProps {
  data: {
    title: string;
    nights: number;
    days: number;
    inclusions: string[];
    highlights: string[];
    hero_image: string;
    price: {
      base_fare: number;
      total_price_per_adult: number;
      emi_per_month: number;
      flight_price: number; 
    };
  };
}

export const PackageCard = ({ data }: PackageCardProps) => {
  const [showPopup, setShowPopup] = useState(false);

return (
  /* RELATIVE class yahan zaroori hai taaki popup iske bahar na jaye */
  <div className="relative bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 font-opensans flex flex-col h-full group">

    {/* ================= CARD CONTENT WRAPPER (FADE LOGIC YAHAN HAI) ================= */}
    <div
      className={`transition-all duration-300 ${
        showPopup ? "opacity-10  scale-[0.98]" : "opacity-100 scale-100"
      }`}
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={data.hero_image}
          alt={data.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col grow">
        <div className="flex justify-between items-start gap-4 mb-4">
          <h3 className="font-bold text-xl text-gray-900 leading-tight">
            {data.title}
          </h3>
          <span className="bg-[#E3F2FD] text-[#3A96DA] text-xs font-bold px-3 py-1.5 rounded-xl border border-[#B3D9F2]">
            {data.nights}N/{data.days}D
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {data.inclusions.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 bg-[#F8F9FA] px-3 py-1.5 rounded-lg"
            >
              <Briefcase size={14} className="text-gray-400" />
              <span className="text-xs text-gray-600 font-medium">
                {item}
              </span>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <p className="text-sm font-bold text-gray-800 mb-3">
            {data.title}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {data.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 border border-gray-50 bg-white px-4 py-3 rounded-xl shadow-sm"
              >
                <Briefcase size={16} className="text-gray-800" />
                <span className="text-[13px] text-[#4CAF50] font-semibold">
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-4 flex justify-between items-end border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
              No Cost EMI at
            </span>
            <span className="text-lg font-bold text-gray-800">
              ₹ {(data.price?.emi_per_month ?? 0).toLocaleString()}/mo
            </span>
          </div>

          <div className="text-right">
            <p className="text-[11px] text-gray-400 line-through">
              Total Price ₹ {(data.price?.total_price_per_adult ?? 0).toLocaleString()}
            </p>
            <button
              onClick={() => setShowPopup(true)}
              className="bg-[#2EB159] text-white px-5 py-2 rounded-2xl font-bold text-lg"
            >
              ₹{(data.price?.base_fare ?? 0).toLocaleString()}/person
            </button>
          </div>
        </div>
      </div>
    </div>
    {/* ================= END CARD CONTENT WRAPPER ================= */}
{showPopup && (
  <div className="absolute inset-0 bg-gray-600/10 z-10 pointer-events-none" />
)}

    {/* ================= POPUP (FADE NAHI HOGA) ================= */}
    {showPopup && (
      <div className="absolute left-0 right-0 bottom-0 py-10 z-20 bg-white rounded-t-2xl shadow-xl animate-in fade-in slide-in-from-bottom-3 duration-300">

        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 bg-[#F0F7FF] border-b">
          <h3 className="font-semibold text-gray-900 text-[13px] truncate pr-4">
            {data.title}
          </h3>
          <button onClick={() => setShowPopup(false)}>
            <X size={16} className="text-gray-400" />
          </button>
        </div>

        {/* Options */}
        <div className="p-4 space-y-3">

          {/* With Flight */}
          <div className="border border-gray-200 rounded-xl px-4 py-3 flex justify-between items-center cursor-pointer">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">
                With Flight
              </p>
              <h4 className="font-bold text-[15px] text-gray-900">
                ₹{data.price.flight_price.toLocaleString()}
              </h4>
            </div>
            <ChevronRight size={18} className="text-[#2EB159]" />
          </div>

          {/* Without Flight */}
          <div className="border-2 border-[#EAD8B1] bg-[#F9F3E5] rounded-xl px-4 py-3 flex justify-between items-center cursor-pointer">
            <div>
              <p className="text-[10px] text-gray-700 font-bold uppercase">
                Without Flight
              </p>
              <h4 className="font-bold text-[15px] text-gray-900">
                ₹{data.price.base_fare.toLocaleString()}
              </h4>
            </div>
            <ChevronRight size={18} className="text-[#2EB159]" />
          </div>

        </div>
      </div>
    )}
    {/* ================= END POPUP ================= */}

  </div>
);
};