import { Plane, Car, Hotel, MapPin, Utensils, ChevronDown, Clock } from "lucide-react";
import { useState } from "react";

export const ItinerarySection = () => {
  const [openDay, setOpenDay] = useState(1);

  return (
    <div className="w-full  font-opensans">
      {/* 1. Top Summary Chips (Exact Gray Rounded) */}
      <div className="flex flex-wrap gap-3 mb-8">
        {["5 DAY PLAN", "2 FLIGHTS & 5 TRANSFERS", "3 HOTELS", "5 ACTIVITIES", "5 MEALS"].map((chip) => (
          <span key={chip} className="bg-[#F3F3F3] text-[#444] px-5 py-2.5 rounded-full text-[11px] font-bold tracking-wider">
            {chip}
          </span>
        ))}
      </div>

      <div className="flex gap-8">
        {/* Left Side: Day Plan Sticky Navigation */}
        <div className="hidden bg-gray-200 p-5 rounded-2xl  md:block w-32 shrink-0">
          <p className="font-bold text-[13px] mb-4 text-[#2C4A5E]">DAY PLAN</p>
          <div className="space-y-6 relative border-l-2 border-gray-100 ml-2">
            {[1, 2, 3, 4].map((d) => (
              <div key={d} className="relative pl-6 cursor-pointer group">
                <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 transition-colors ${openDay === d ? 'bg-[#C9A961] border-[#C9A961]' : 'bg-white border-gray-300'}`} />
                <p className={`text-[11px] font-bold ${openDay === d ? 'text-black' : 'text-gray-400 group-hover:text-gray-600'}`}>
                  07 Jan, Wed
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Expandable Itinerary Content */}
        <div className="flex-grow space-y-4">
          {[1, 2, 3, 4].map((dayNum) => (
            <div key={dayNum} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm bg-white">
              {/* Day Header (Black Header from Figma) */}
              <div 
                onClick={() => setOpenDay(openDay === dayNum ? 0 : dayNum)}
                className="bg-[#9c9e9f] text-white px-5 py-3 flex justify-between items-center cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="bg-white/20 px-3 py-1 rounded text-[11px] font-bold">DAY {dayNum}</span>
                  <p className="text-sm font-medium">Arrival in Kochi • <span className="text-gray-300 uppercase text-[10px]">Included</span> 1 Flight | 1 Hotel | 1 Transfer | 2 Activities | 1 Meal</p>
                </div>
                <ChevronDown size={20} className={`transition-transform ${openDay === dayNum ? 'rotate-180' : ''}`} />
              </div>

              {openDay === dayNum && (
                <div className="p-6 space-y-10 animate-in fade-in slide-in-from-top-2">
                  
                  {/* FLIGHT SECTION */}
                  <div className="flex gap-6">
                    <Plane size={20} className="text-gray-800 mt-1" />
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-4">
                        <p className="font-bold text-sm uppercase">Flight</p>
                        <span className="text-gray-400 text-xs">• New Delhi to Kochi • 03h 10m</span>
                      </div>
                      <div className="bg-[#F9F9F9] rounded-xl p-6 flex items-center justify-between border border-gray-50">
                        <div className="flex items-center gap-6">
                           <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border shadow-sm">
                             <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Air_India_Logo.svg" alt="AirIndia" className="w-8" />
                           </div>
                           <div className="text-center">
                              <p className="font-bold text-xl">17:00</p>
                              <p className="text-[10px] text-gray-500 font-bold">New Delhi</p>
                           </div>
                           <div className="flex flex-col items-center px-4">
                              <span className="text-[10px] text-gray-400 italic">Non-stop</span>
                              <div className="w-24 h-[1px] bg-gray-300 relative border-t border-dashed">
                                 <div className="absolute top-1/2 -right-1 w-1 h-1 bg-gray-400 rounded-full" />
                              </div>
                           </div>
                           <div className="text-center">
                              <p className="font-bold text-xl">20:00</p>
                              <p className="text-[10px] text-gray-500 font-bold">Munnar</p>
                           </div>
                        </div>
                        <div className="text-[11px] font-medium text-gray-600 space-y-1">
                          <p>Cabin: 7Kgs</p>
                          <p>Check-in: 15Kgs</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* TRANSFER SECTION */}
                  <div className="flex gap-6 border-t pt-8 border-gray-100">
                    <Car size={20} className="text-gray-800 mt-1" />
                    <div className="flex-grow">
                      <p className="font-bold text-sm uppercase mb-4">Transfer <span className="text-gray-400 font-normal text-xs">• Airport to Hotel • 01h</span></p>
                      <div className="flex gap-5 items-center">
                        <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957" className="w-48 h-28 object-cover rounded-xl" />
                        <div>
                          <h4 className="font-bold text-lg text-gray-800">Private Transfer</h4>
                          <p className="text-xs text-gray-500 mt-1">7 Seater | AC | 2 Luggage Bags | Daily Water Bottle</p>
                          <p className="text-xs text-gray-500 mt-1 italic font-medium">Airport Transfer and Sightseeing Included</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* HOTEL SECTION (Exact Figma Card) */}
                  <div className="flex gap-6 border-t pt-8 border-gray-100">
                    <Hotel size={20} className="text-gray-800 mt-1" />
                    <div className="flex-grow">
                      <p className="font-bold text-sm uppercase mb-4">Hotel <span className="text-gray-400 font-normal text-xs">• New Delhi to Kochi • 03h 10m</span></p>
                      <div className="flex flex-col lg:flex-row gap-6">
                        <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945" className="w-full lg:w-64 h-40 object-cover rounded-2xl" />
                        <div className="flex-grow">
                          <h4 className="font-bold text-xl text-gray-800">Lake Forest Munnar By Hawk Hospitality</h4>
                          <div className="flex items-center gap-1 my-1">
                            {[1, 2, 3, 4].map(s => <span key={s} className="text-green-500 text-xs">★</span>)}
                            <span className="text-xs text-gray-400 ml-2">4.5 (1k reviews) For Visit</span>
                          </div>
                          <p className="font-bold text-[#2EB159] text-sm mt-3">AC Deluxe Room with Balcony</p>
                          <ul className="mt-2 space-y-1">
                            <li className="text-[11px] text-gray-600 flex items-center gap-2">✔ Breakfast Included</li>
                            <li className="text-[11px] text-gray-600 flex items-center gap-2">✔ Special Honeymoon Decor Included</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};