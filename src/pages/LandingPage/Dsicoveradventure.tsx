import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Clock } from "lucide-react"


const adventures = [
  {
    id: 1,
    title: "Shimla & Manali",
    subtitle: "Colonial Charm Meets Alpine Beauty",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80",
    price: "₹18,999",
    rating: 4.9,
    duration: "5-7 Days",
    location: "HIMACHAL PRADESH, INDIA",
    highlights: ["SNOW-CAPPED PEAKS", "HERITAGE HOTELS", "ADVENTURE SPORTS"],
  },
  {
    id: 2,
    title: "Kasol & Kullu Valley",
    subtitle: "Serenity in the Parvati Valley",
    image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80",
    price: "₹14,999",
    duration: "4-6 Days",
    rating: 4.8,
    location: "HIMACHAL PRADESH, INDIA",
    highlights: ["RIVERSIDE CAMPS", "TREKKING TRAILS", "LOCAL CULTURE"],
  },
  {
    id: 3,
    title: "Kathmandu & Pokhara",
    subtitle: "Spiritual Awakening in Nepal",
    image: "https://images.unsplash.com/photo-1571482710998-e9a587ab54d3?w=800&q=80",
    price: "₹32,999",
    duration: "7-9 Days",
    rating: 5,
    location: "NEPAL",
    highlights: ["ANCIENT TEMPLES", "MOUNTAIN VIEWS", "CULTURAL HERITAGE"],
  },
  {
    id: 4,
    title: "Bhutan Explorer",
    subtitle: "Kingdom of Happiness",
    image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80",
    price: "₹52,999",
    duration: "8-10 Days",
    rating: 5,
    location: "KINGDOM OF BHUTAN",
    highlights: ["TIGER'S NEST", "DZONGS & MONASTERIES", "GROSS NATIONAL HAPPINESS"],
  },
]

export default function DiscoverAdventure() {

   


  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex-1 max-w-[200px] h-[1px] bg-[#D4A76A]"></div>
            <p className="text-[#D4A76A] font-medium tracking-[0.2em] text-[11px] uppercase">
              CURATED DESTINATIONS
            </p>
            <div className="flex-1 max-w-[200px] h-[1px] bg-[#D4A76A]"></div>
          </div>

          <h2 className="text-5xl font-bold mb-0 text-[#2C2C2C] leading-tight">
            Discover Your Next
          </h2>
          <p 
            className="text-5xl text-[#D4A76A] font-light italic mb-5" 
            style={{ fontFamily: 'serif' }}
          >
            Adventure
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto text-[15px] leading-relaxed">
            From the misty valleys of Himachal to the sacred monasteries of Bhutan,<br />
            each destination promises an unforgettable journey.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {adventures.map((adventure) => (
            <Card 
              key={adventure.id} 
              className="overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 border-0 rounded-none"
            >
              {/* Image Section */}
              <div className="relative h-[340px] overflow-hidden group">
                <img
                  src={adventure.image}
                  alt={adventure.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20"></div>

                {/* Rating Badge */}
                <div className="absolute top-5 left-5 bg-white rounded-sm px-3 py-1.5 flex items-center gap-1.5 shadow-md">
                  <Star className="w-3.5 h-3.5 fill-[#D4A76A] text-[#D4A76A]" />
                  <span className="font-semibold text-gray-900 text-sm">
                    {adventure.rating}
                  </span>
                </div>

                {/* Price Badge */}
                <div className="absolute top-5 right-5 bg-[#D4A76A] text-white px-4 py-2 rounded-sm shadow-md">
                  <p className="text-[10px] font-semibold tracking-wider">FROM</p>
                  <p className="text-lg font-bold leading-tight">{adventure.price}</p>
                </div>

                {/* Title Section */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium tracking-wide uppercase text-white/90">
                      {adventure.location}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold mb-0.5 text-white leading-tight">
                    {adventure.title}
                  </h3>
                  <p 
                    className="text-[15px] font-light italic text-white/95" 
                    style={{ fontFamily: 'serif' }}
                  >
                    {adventure.subtitle}
                  </p>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 bg-white">
                {/* Duration */}
                <div className="flex items-center gap-2 mb-4 text-[#D4A76A]">
                  <Clock className="w-4 h-4" />
                  <span className="text-[13px] font-medium">{adventure.duration}</span>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {adventure.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium text-gray-700 border border-gray-300 bg-white px-3 py-1.5 rounded-sm tracking-wide"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* View Details Button */}
                <Button
                  variant="outline"
                  className="w-full border-[#D4A76A] text-[#D4A76A] hover:bg-[#D4A76A] hover:text-white transition-colors duration-200 font-semibold py-2.5 text-[13px] tracking-wide rounded-sm"
                >
                  VIEW DETAILS →
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Explore All Button */}
        <div className="text-center">
          <Button className="bg-[#D4A76A] text-white hover:bg-[#C19558] px-10 py-3 text-[14px] font-semibold rounded-sm shadow-md transition-colors duration-200 tracking-wide">
            Explore all Destinations
          </Button>
        </div>
      </div>
    </section>
  )
}