import { Plane, Car, Check } from "lucide-react";

export const SummaryCityCard = ({ cityData }: any) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-8">
      {/* Top Transport Info Bar */}
      <div className="bg-[#F8F9FB] px-6 py-3 flex flex-col gap-2 border-b border-gray-50">
        <div className="flex items-center gap-3 text-[11px] font-medium text-gray-600">
          <Plane size={14} className="text-gray-400" />
          <span>Arrival in Kochi by Air India flight AI-4738 | Departing on 07 Jan, 05:00 PM | Arriving on 07 Jan, 08:25 PM | Includes Check-in Baggage</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-medium text-gray-600">
          <Car size={14} className="text-gray-400" />
          <span>Airport in Kochi to hotel in Munnar</span>
        </div>
      </div>

      {/* City Header */}
      <div className="bg-gradient-to-r from-[#FDF6E9] to-white px-6 py-4">
        <h3 className="font-extrabold text-[#2C4A5E] text-lg">
          {cityData.cityName} - <span className="font-medium">{cityData.nights} Nights Stay</span>
        </h3>
      </div>

      {/* Summary Table Structure */}
      <div className="p-0">
        {cityData.days.map((day: any, idx: number) => (
          <div key={idx} className={`grid grid-cols-12 border-b border-gray-50 last:border-0`}>
            {/* Day Label */}
            <div className="col-span-2 border-r border-gray-50 p-4 flex flex-col justify-center items-center bg-[#FAFAFA]/50">
              <p className="font-bold text-gray-800 text-sm">Day {day.dayNum}</p>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">{day.date}</p>
            </div>

            {/* Services Columns */}
            <div className="col-span-10 grid grid-cols-2 gap-x-8 p-4 bg-white">
              {day.services.map((service: any, sIdx: number) => (
                <div key={sIdx} className="flex items-start gap-3 py-2">
                  <div className="mt-1 bg-gray-100 rounded-full p-0.5">
                    <Check size={10} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-700 leading-tight">
                      <span className="font-bold">{service.label}:</span> {service.value}
                    </p>
                    {service.subValue && <p className="text-[9px] text-gray-400 font-medium">{service.subValue}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};