export const PricingSidebar = ({ priceData }: any) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sticky top-40 h-fit">
      <button className="w-full bg-[#C9A961] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#b39552] shadow-lg shadow-yellow-100 transition-all mb-6">
        PAY & Book Now
      </button>

      <div className="space-y-4 mb-6">
        {[
          { label: "Base fare per adult", value: priceData.base_fare },
          { label: "Tax", value: priceData.tax },
          { label: "Reservation charge", value: priceData.reservation_charge },
          { label: "Superfast charge", value: priceData.superfast_charge },
          { label: "Tatkal fare", value: priceData.tatkal_fare },
        ].map((item, i) => (
          <div key={i} className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-medium">{item.label}</span>
            <span className="text-gray-900 font-bold">₹{item.value}</span>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 flex justify-between items-center">
        <span className="font-bold text-gray-800">Total Price per adult</span>
        <span className="text-2xl font-extrabold text-[#2C4A5E]">₹{priceData.total_price_per_adult}</span>
      </div>

      {/* Coupons Section */}
      <div className="mt-8 p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
        <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Coupons</p>
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-red-500 flex items-center gap-1">🏷️ SHINEETRIP500</span>
          <button className="text-[#C9A961] font-bold text-xs uppercase">Apply</button>
        </div>
      </div>
      
      <p className="text-[10px] text-gray-400 mt-4 text-center italic">
        * + ₹ 144 taxes & fees per night
      </p>
    </div>
  );
};