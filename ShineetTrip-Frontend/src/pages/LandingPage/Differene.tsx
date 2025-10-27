import { Card } from "@/components/ui/card"

const differences = [
  {
    id: 1,
    title: "Personalized Itineraries",
    description: "Customized travel plans tailored to your preferences and interests for a unique experience.",
    image: "/personalized-travel-planning.jpg",
  },
  {
    id: 2,
    title: "Expert Local Guides",
    description: "Experienced guides with deep knowledge of local culture, history, and hidden gems.",
    image: "/local-guide-mountains.jpg",
  },
  {
    id: 3,
    title: "Premium Accommodations",
    description: "Handpicked hotels and resorts offering comfort and authentic local experiences.",
    image: "/luxury-mountain-resort.png",
  },
  {
    id: 4,
    title: "Best Connectivity",
    description: "Seamless travel arrangements with 24/7 support and reliable transportation.",
    image: "/travel-connectivity.jpg",
  },
  {
    id: 5,
    title: "Complete Travel Packages",
    description: "All-inclusive packages covering accommodation, meals, activities, and transportation.",
    image: "/complete-travel-package.jpg",
  },
  {
    id: 6,
    title: "Himalayan Specialists",
    description: "Dedicated team of experts specializing in Himalayan and mountain region travel.",
    image: "/himalayan-mountains-specialist.jpg",
  },
]

export default function Difference() {
  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">The Shinee Trip</h2>
          <p className="text-2xl md:text-3xl text-accent font-light">Difference</p>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            We go beyond typical tourism, creating immersive experiences that connect you with the soul of the
            mountains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differences.map((item) => (
            <Card key={item.id} className="overflow-hidden bg-background hover:shadow-lg transition">
              <div className="h-48 overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
