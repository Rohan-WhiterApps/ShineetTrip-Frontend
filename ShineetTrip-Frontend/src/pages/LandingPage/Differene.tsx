"use client"

import { Heart, Key, UtensilsCrossed, Building2, Shield, Bookmark } from "lucide-react"

const services = [
  {
    id: 1,
    number: "01",
    icon: Heart,
    title: "PERSONALIZED ITINERARIES",
    description: "Every journey is crafted exclusively for you, ensuring your travel dreams become reality with meticulous attention to detail.",
    image: "data:image/jpeg;base64,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",
  },
  {
    id: 2,
    number: "02",
    icon: Key,
    title: "PREMIUM ACCOMMODATIONS",
    description: "Handpicked luxury hotels and heritage properties that offer the perfect blend of comfort, elegance, and local charm.",
    image: "/luxury-hotel-bedroom-interior.jpg",
  },
  {
    id: 3,
    number: "03",
    icon: UtensilsCrossed,
    title: "CURATED EXPERIENCES",
    description: "Access to exclusive local experiences, cultural immersions, and adventure activities guided by experts.",
    image: "/fine-dining-restaurant-food.jpg",
  },
  {
    id: 4,
    number: "04",
    icon: Building2,
    title: "24/7 CONCIERGE",
    description: "Round-the-clock dedicated support ensuring seamless travel experiences and immediate assistance whenever needed.",
    image: "/modern-hotel-building-architecture.jpg",
  },
  {
    id: 5,
    number: "05",
    icon: Shield,
    title: "COMPLETE TRAVEL CARE",
    description: "Comprehensive planning from transportation to activities, allowing you to simply relax and enjoy your journey.",
    image: "/mountain-landscape-nature-travel.jpg",
  },
  {
    id: 6,
    number: "06",
    icon: Bookmark,
    title: "HIMACHAL SPECIALISTS",
    description: "As Himachal's premier leisure planner, we possess unparalleled knowledge of every hidden gem and exclusive location.",
    image: "/mountain-sunset-landscape-himachal.jpg",
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
    <section className=" bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-px bg-amber-600"></div>
            <h3 className="mx-4 text-sm font-semibold text-[#D4A76A] uppercase tracking-widest">
              OUR SIGNATURE SERVICES
            </h3>
            <div className="w-12 h-px text-[#D4A76A]"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">The Shinee Trip</h2>
          <p className="text-4xl md:text-5xl text-[#D4A76A] font-light italic mb-8">Difference</p>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Experience unparalleled service excellence with our commitment to creating extraordinary journeys that exceed expectations.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <div key={service.id} className="group">
                <div className="relative h-80 rounded-lg overflow-hidden mb-6 shadow-lg">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                  
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <IconComponent size={24} className="text-white" />
                  </div>

                  <div className="absolute top-2 right-4 text-white/30 text-5xl font-bold">
                    {service.number}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-white text-xl font-bold tracking-wide">{service.title}</h3>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed px-2">{service.description}</p>
              </div>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-b border-gray-200">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#D4A76A] mb-2">{stat.value}</div>
              <div className="text-sm text-[#D4A76A] uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}