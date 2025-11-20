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
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&q=80",
    number: "01",
  },
  {
    id: 2,
    name: "AMIT PATEL",
    location: "Bangalore, India",
    package: "NEPAL CULTURAL TOUR",
    content: "The Nepal experience exceeded all expectations. From ancient temples in Kathmandu to serene sunrise at Pokhara, every moment was expertly planned. The local guides were knowledgeable, and the heritage hotels were absolutely stunning. Shinee Trip's expertise truly shines through.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&q=80",
    number: "02",
  },
  {
    id: 3,
    name: "SNEHA REDDY",
    location: "Hyderabad, India",
    package: "KASOL FAMILY RETREAT",
    content: "As Himachal specialists, they know every hidden gem! Our family trip to Kasol was perfectly customized with activities for everyone. The riverside camps were luxurious, the food was exceptional, and the 24/7 support gave us complete peace of mind. Highly recommended!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&q=80",
    number: "03",
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 bg-[#2C3C3C] font-opensans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex-1 max-w-[180px] h-[1px] bg-[#D4A76A]"></div>
            <p className="text-[#D4A76A] font-medium tracking-[0.2em] text-[11px] uppercase font-opensans">
              CLIENT STORIES
            </p>
            <div className="flex-1 max-w-[180px] h-[1px] bg-[#D4A76A]"></div>
          </div>

          <h2 className="text-5xl font-bold mb-0 text-white leading-tight font-opensans">Traveler</h2>
          <p className="text-5xl text-[#D4A76A] font-light italic mb-5 font-opensans" style={{ fontFamily: 'serif' }}>
            Testimonials
          </p>

          <p className="text-gray-300 text-[15px] max-w-2xl mx-auto leading-relaxed font-opensans">
            Discover why thousands of travelers trust us to create their most<br />
            cherished memories across the Himalayas.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="relative bg-[#425656] border-0 p-8 overflow-hidden group hover:shadow-xl transition-shadow duration-300 rounded-none"
            >
              {/* Background Number */}
              <div className="absolute top-4 right-6 text-[#4A5E5E] text-[120px] font-bold leading-none pointer-events-none opacity-50 font-opensans">
                {testimonial.number}
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5 relative z-10">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-[#D4A76A] text-[#D4A76A]" />
                ))}
              </div>

              {/* Package Badge */}
              <div className="bg-[#8B7355] border border-[#A5865F] px-4 py-2 inline-block mb-6 relative z-10 rounded-sm">
                <p className="text-[#D4A76A] text-[11px] font-semibold tracking-[0.15em] font-opensans">
                  {testimonial.package}
                </p>
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-300 mb-8 leading-relaxed relative z-10 text-[14px] font-opensans">
                "{testimonial.content}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-white text-[13px] leading-tight font-opensans">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-400 text-[12px] mt-0.5 font-opensans">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}