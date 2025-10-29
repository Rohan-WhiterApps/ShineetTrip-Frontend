import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Clock } from "lucide-react"

const adventures = [
  {
    id: 1,
    title: "Shimla & Manali",
    subtitle: "Colonial Charm Meets Alpine Beauty",
    image : "data:image/jpeg;base64,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",
    price: "₹18,999",
    rating: 4.0,
    duration : "5 -6 days" ,
    location: "HIMACHAL PRADESH, INDIA",
    highlights: ["SNOW-CAPPED PEAKS", "HERITAGE HOTELS", "ADVENTURE SPORTS"],
  },
  {
    id: 2,
    title: "Kasol & Kullu Valley",
    subtitle: "Serenity in the Parvati Valley",
    image : "",
    price: "₹14,999",
    duration : "5 -6 days" ,
    rating: 4.8,
    location: "HIMACHAL PRADESH, INDIA",
    highlights: ["RIVERSIDE CAMPS", "TREKKING TRAILS", "LOCAL CULTURE"],
  },
  {
    id: 3,
    title: "Kathmandu & Pokhara",
    subtitle: "Spiritual Awakening in Nepal",
     image : "",
    price: "₹32,999",
    duration : "5 -6 days" ,
    rating: 6,
    location: "NEPAL",
    highlights: ["ANCIENT TEMPLES", "MOUNTAIN VIEWS", "CULTURAL HERITAGE"],
  },
  {
    id: 4,
    title: "Bhutan Explorer",
    subtitle: "Kingdom of Happiness",
     image : "",
    price: "₹52,999",
    duration : "5 -6 days" ,
    rating: 6,
    location: "KINGDOM OF BHUTAN",
    highlights: ["TIGER'S NEST", "DZONGS & MONASTERIES", "GROSS NATIONAL HAPPINESS"],
  },
]

export default function DiscoverAdventure() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex-1 h-px bg-[#D4A76A]"></div>
            <p className="text-[#D4A76A] font-semibold tracking-widest text-sm uppercase">CURATED DESTINATIONS</p>
            <div className="flex-1 h-px bg-[#D4A76A]"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-2 text-gray-900">Discover Your Next</h2>
          <p className="text-3xl md:text-4xl text-[#D4A76A] font-light italic mb-6">Adventure</p>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            From the misty valleys of Himachal to the sacred monasteries of Bhutan, each destination promises an
            unforgettable journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {adventures.map((adventure) => (
            <Card key={adventure.id} className="overflow-hidden bg-white hover:shadow-xl transition-all duration-300 border border-gray-200">
              <div className="relative h-80 overflow-hidden group">
                <img
                  src={adventure.image || "/placeholder.svg"}
                  alt={adventure.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/30"></div>

                <div className="absolute top-4 left-4 bg-white rounded-lg px-3 py-2 flex items-center gap-1 shadow-lg">
                  <Star className="w-4 h-4 fill-[#D4A76A] text-[#D4A76A]" />
                  <span className="font-semibold text-gray-900 text-sm">{adventure.rating}</span>
                </div>

                <div className="absolute top-4 right-4 bg-[#D4A76A] text-white px-4 py-2 rounded-lg shadow-lg">
                  <p className="text-xs font-semibold tracking-wide">FROM</p>
                  <p className="text-lg font-bold">{adventure.price}</p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-2 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs font-semibold tracking-wide text-white/90">{adventure.location}</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-1 text-white">{adventure.title}</h3>
                  <p className="text-sm font-light italic text-white/90">{adventure.subtitle}</p>
                </div>
              </div>

              <div className="p-3">
                <div className="flex items-center gap-2 mb-3 text-[#D4A76A]">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-semibold tracking-wide">{adventure.duration}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {adventure.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium text-gray-600 border border-gray-300 bg-gray-50 px-3 py-1.5 rounded-md"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full border-[#D4A76A] text-[#D4A76A] hover:bg-[#D4A76A] hover:text-white transition-colors duration-200 font-semibold py-2.5"
                >
                  VIEW DETAILS →
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button className="bg-[#D4A76A] text-white hover:bg-[#C19558] px-12 py-3 text-base font-semibold rounded-md shadow-md transition-colors duration-200">
            Explore all Destinations
          </Button>
        </div>
      </div>
    </section>
  )
}