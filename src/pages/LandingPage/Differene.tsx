"use client"

import { Heart, Key, UtensilsCrossed, Building2, Shield, Bookmark } from "lucide-react"

const services = [
  {
    id: 1,
    number: "01",
    icon: Heart,
    title: "PERSONALIZED ITINERARIES",
    description: "Every journey is crafted exclusively for you, ensuring your travel dreams become reality with meticulous attention to detail.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
  {
    id: 2,
    number: "02",
    icon: Key,
    title: "PREMIUM ACCOMMODATIONS",
    description: "Handpicked luxury hotels and heritage properties that offer the perfect blend of comfort, elegance, and local charm.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
  },
  {
    id: 3,
    number: "03",
    icon: UtensilsCrossed,
    title: "CURATED EXPERIENCES",
    description: "Access to exclusive local experiences, cultural immersions, and adventure activities guided by experts.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
  },
  {
    id: 4,
    number: "04",
    icon: Building2,
    title: "24/7 CONCIERGE",
    description: "Round-the-clock dedicated support ensuring seamless travel experiences and immediate assistance whenever needed.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
  },
  {
    id: 5,
    number: "05",
    icon: Shield,
    title: "COMPLETE TRAVEL CARE",
    description: "Comprehensive planning from transportation to activities, allowing you to simply relax and enjoy your journey.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
  },
  {
    id: 6,
    number: "06",
    icon: Bookmark,
    title: "HIMACHAL SPECIALISTS",
    description: "As Himachal's premier leisure planner, we possess unparalleled knowledge of every hidden gem and exclusive location.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
]

const stats = [
  { value: "50+", label: "DESTINATIONS" },
  { value: "10K+", label: "HAPPY TRAVELERS" },
  { value: "15+", label: "YEARS EXPERIENCE" },
  { value: "100%", label: "SATISFACTION" },
]

export default function Difference() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex-1 max-w-[180px] h-[1px] bg-[#D4A76A]"></div>
            <p className="text-[#D4A76A] font-medium tracking-[0.2em] text-[11px] uppercase">
              OUR SIGNATURE SERVICES
            </p>
            <div className="flex-1 max-w-[180px] h-[1px] bg-[#D4A76A]"></div>
          </div>
          
          <h2 className="text-5xl font-bold mb-0 text-[#2C2C2C] leading-tight">
            The Shinee Trip
          </h2>
          <p className="text-5xl text-[#D4A76A] font-light italic mb-5" style={{ fontFamily: 'serif' }}>
            Difference
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto text-[15px] leading-relaxed">
            Experience unparalleled service excellence with our commitment to<br />
            creating extraordinary journeys that exceed expectations.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <div key={service.id} className="group">
                <div className="relative h-[280px] overflow-hidden mb-5">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                  
                  {/* Icon */}
                  <div className="absolute top-5 left-5 bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <IconComponent size={24} className="text-white" />
                  </div>

                  {/* Number */}
                  <div className="absolute top-4 right-5 text-white/20 text-[80px] font-bold leading-none">
                    {service.number}
                  </div>

                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white text-lg font-bold tracking-wide leading-tight">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-[14px] leading-relaxed">
                  {service.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="py-12 border-t-2 border-b-2" style={{ borderColor: 'white' }}>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center py-4"
                style={{ 
                  borderRight: index !== stats.length - 1 ? '2px solid #DDB980' : 'none' 
                }}
              >
                <div className="text-5xl font-bold text-[#D4A76A] mb-2 leading-none">
                  {stat.value}
                </div>
                <div className="text-[11px] text-[#D4A76A] uppercase tracking-[0.15em] font-medium mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}