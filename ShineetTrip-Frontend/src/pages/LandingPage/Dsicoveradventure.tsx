import { Card } from "@/components/ui/card"
//import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const adventures = [
  {
    id: 1,
    title: "Shimla & Manali",
    image: "/shimla-manali-mountains.jpg",
    duration: "5 Days",
    price: "$1,299",
    highlights: ["Snow-capped peaks", "Adventure sports", "Local culture"],
  },
  {
    id: 2,
    title: "Ladakh & Kailash Valley",
    image: "/ladakh-kailash-valley.jpg",
    duration: "7 Days",
    price: "$1,599",
    highlights: ["High altitude lakes", "Trekking trails", "Spiritual journey"],
  },
  {
    id: 3,
    title: "Kathmandu & Pokhara",
    image: "/kathmandu-pokhara-nepal.jpg",
    duration: "4 Days",
    price: "$899",
    highlights: ["Ancient temples", "Mountain views", "Cultural tours"],
  },
  {
    id: 4,
    title: "Bhutan & Paro Valley",
    image: "/bhutan-paro-valley.jpg",
    duration: "6 Days",
    price: "$1,799",
    highlights: ["Tiger nest monastery", "Pristine nature", "Unique culture"],
  },
]

export default function DiscoverAdventure() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Discover Your Next</h2>
          <p className="text-2xl md:text-3xl text-accent font-light mb-4">Adventure</p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From the vast valleys of Himalayas to the sacred mountains of Bhutan, explore our curated collection of
            unforgettable journeys.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {adventures.map((adventure) => (
            <Card key={adventure.id} className="overflow-hidden bg-card hover:shadow-lg transition">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={adventure.image || "/placeholder.svg"}
                  alt={adventure.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
               {/* // <Badge className="absolute top-4 right-4 bg-accent text-header-bg">{adventure.duration}</Badge> */}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-3">{adventure.title}</h3>
                <div className="space-y-3 mb-6">
                  {adventure.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                      {highlight}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-accent">{adventure.price}</span>
                  <Button variant="outline" className="border-accent text-accent hover:bg-accent/10 bg-transparent">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-accent text-header-bg hover:bg-accent/90 px-8 py-6 text-lg">
            Explore All Journeys
          </Button>
        </div>
      </div>
    </section>
  )
}
