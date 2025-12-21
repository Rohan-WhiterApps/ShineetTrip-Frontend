import { Plane, Hotel, MapPin, Coffee, Car } from "lucide-react";

export const ItineraryItemCard = ({ item }: any) => {
  if (item.type === 'flight') {
    return (
      <div className="bg-[#F8F9FB] rounded-2xl p-4 border border-gray-100 flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="bg-white p-3 rounded-xl shadow-sm">
            <Plane size={24} className="text-blue-500" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Flight</p>
            <h4 className="font-bold text-gray-800">{item.data.from} to {item.data.to}</h4>
          </div>
        </div>
        <span className="text-sm font-bold text-gray-500">Included</span>
      </div>
    );
  }

  if (item.type === 'hotel') {
    return (
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex gap-4 mb-4">
        <img 
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945" 
          className="w-24 h-24 rounded-xl object-cover" 
          alt="hotel"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">{item.roomType}</p>
              <h4 className="font-bold text-gray-800 text-lg leading-tight">{item.hotelName}</h4>
            </div>
            <span className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-1 rounded-md">
              {item.mealPlan}
            </span>
          </div>
          <div className="flex items-center gap-4 mt-3">
             <div className="flex items-center gap-1 text-gray-400 text-xs">
                <Coffee size={14} /> Breakfast
             </div>
             <div className="flex items-center gap-1 text-gray-400 text-xs">
                <MapPin size={14} /> City Center
             </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};