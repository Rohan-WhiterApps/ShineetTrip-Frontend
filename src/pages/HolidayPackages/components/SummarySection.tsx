import { SummaryCityCard } from "./SummaryCityCard";

export const SummarySection = () => {
  // Dummy Data as per Figma 'Holiday packages (4).jpg'
  const summaryData = [
    {
      cityName: "Munnar",
      nights: 2,
      days: [
        {
          dayNum: 1,
          date: "Jan 7, Wed",
          services: [
            { label: "Sightseeing", value: "Sightseeing in Munnar" },
            { label: "Check-in", value: "Lake Forest Munnar By Hawk Hospitality", subValue: "5 Star" },
            { label: "Activity", value: "Complimentary Guided Spice Plantation Tour" },
            { label: "Meal", value: "Traditional Meal of Kerala" }
          ]
        },
        {
          dayNum: 2,
          date: "Jan 8, Thu",
          services: [
            { label: "Private Cab", value: "Private AC Pro Sedan for sightseeing in & around Munnar" },
            { label: "Sightseeing", value: "Sightseeing in Munnar" },
            { label: "Meal", value: "Breakfast - Included at Lake Forest Munnar By Hawk Hospitality" }
          ]
        }
      ]
    },
    // Repeat for other cities...
  ];

  return (
    <div className="animate-in fade-in duration-500">
      {/* Top Filter Chips (Same as Itinerary) */}
      <div className="flex flex-wrap gap-3 mb-8">
        {["5 DAY PLAN", "2 FLIGHTS & 5 TRANSFERS", "3 HOTELS", "5 ACTIVITIES", "5 MEALS"].map((chip) => (
          <span key={chip} className="bg-[#F3F3F3] text-[#444] px-5 py-2.5 rounded-full text-[11px] font-bold tracking-wider">
            {chip}
          </span>
        ))}
      </div>

      {summaryData.map((city, index) => (
        <SummaryCityCard key={index} cityData={city} />
      ))}

      {/* Important Note (Optional but good for UX) */}
      <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl">
        <p className="text-xs text-orange-700 leading-relaxed">
          <span className="font-bold">Note:</span> The itinerary is subject to change based on weather conditions and availability of services. All inclusions mentioned are confirmed.
        </p>
      </div>
    </div>
  );
};