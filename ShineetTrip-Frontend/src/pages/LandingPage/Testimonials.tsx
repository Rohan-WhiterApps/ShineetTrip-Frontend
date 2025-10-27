import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Adventure Enthusiast",
    content:
      "The Shinee Trip team made our Himalayan journey unforgettable. Every detail was perfectly planned and executed.",
    rating: 5,
    image: "/woman-profile.png",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Travel Blogger",
    content:
      "Exceptional service and authentic experiences. The local guides provided insights that no guidebook could offer.",
    rating: 5,
    image: "/man-profile.png",
  },
  {
    id: 3,
    name: "Emma Williams",
    role: "Nature Lover",
    content:
      "From the moment we booked until we returned home, everything was seamless. Highly recommended for mountain lovers!",
    rating: 5,
    image: "/smiling-woman-profile.png",
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-green-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Traveler</h2>
          <p className="text-2xl md:text-3xl text-accent font-light">Testimonials</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-card/50 border-border/50 p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
