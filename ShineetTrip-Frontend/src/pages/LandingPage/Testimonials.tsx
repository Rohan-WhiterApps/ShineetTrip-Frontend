"use client"

import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "PRIYA & RAHUL SHARMA",
    location: "Mumbai, India",
    package: "MANALI HONEYMOON PACKAGE",
    content: "Our honeymoon in Manali was nothing short of magical. Shinee Trip curated every detail perfectly—from the luxurious resort with mountain views to the private candlelight dinner under the stars. The attention to detail and personalized service made our trip truly unforgettable.",
    rating: 5,
    image: "/sunset-profile-1.jpg",
    number: "01",
  },
  {
    id: 2,
    name: "AMIT PATEL",
    location: "Bangalore, India",
    package: "NEPAL CULTURAL TOUR",
    content: "The Nepal experience exceeded all expectations. From ancient temples in Kathmandu to serene sunrise at Pokhara, every moment was expertly planned. The local guides were knowledgeable, and the heritage hotels were absolutely stunning. Shinee Trip's expertise truly shines through.",
    rating: 5,
    image: "/sunset-profile-2.jpg",
    number: "02",
  },
  {
    id: 3,
    name: "SNEHA REDDY",
    location: "Hyderabad, India",
    package: "KASOL FAMILY RETREAT",
    content: "As Himachal specialists, they know every hidden gem! Our family trip to Kasol was perfectly customized with activities for everyone. The riverside camps were luxurious, the food was exceptional, and the 24/7 support gave us complete peace of mind. Highly recommended!",
    rating: 5,
    image: "/sunset-profile-3.jpg",
    number: "03",
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-px bg-[#D4A76A]"></div>
            <h3 className="mx-4 text-sm font-semibold text-[#D4A76A] uppercase tracking-widest">
              CLIENT STORIES
            </h3>
            <div className="w-16 h-px text-[#D4A76A]"></div>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-2">Traveler</h2>
          <p className="text-4xl md:text-5xl text-[#D4A76A] font-light italic mb-8">Testimonials</p>

          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover why thousands of travelers trust us to create their most cherished memories across the Himalayas.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="relative bg-slate-800 border border-slate-700 p-8 overflow-hidden group hover:border-amber-600/30 transition-colors duration-300"
            >
              {/* Background Number */}
              <div className="absolute top-2 right-4 text-slate-700 text-7xl font-bold pointer-events-none">
                {testimonial.number}
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-amber-600 text-[#D4A76A]" />
                ))}
              </div>

              {/* Package Badge */}
              <div className="bg-amber-900/30 border border-amber-700/50 px-4 py-2 inline-block mb-6 relative z-10">
                <p className=" text-sm font-semibold tracking-wide">{testimonial.package}</p>
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-300 mb-8 leading-relaxed relative z-10 text-sm italic">"{testimonial.content}"</p>

              {/* Author Info */}
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white font-bold text-sm">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{testimonial.name}</p>
                  <p className="text-gray-400 text-xs">{testimonial.location}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}