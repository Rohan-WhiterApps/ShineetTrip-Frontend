import { useEffect, useState } from "react"

interface Destination {
  name: string
  description: string
  image: string
}

export default function PopularDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 🧠 Fallback (dummy) destinations to maintain UI structure
  const fallbackDestinations: Destination[] = [
    {
      name: "Mumbai",
      description: "Commercial and Financial Capital of India",
      image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800&q=80"
    },
    {
      name: "Paris",
      description: "The city of love",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80"
    },
    {
      name: "Kyoto",
      description: "A historic destination featuring endless natural beauty",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80"
    },
    {
      name: "Kerala",
      description: "Natural cultural beauty at its peak",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80"
    },
    {
      name: "Hyderabad",
      description: "The city of Nizams",
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&q=80"
    },
    {
      name: "Nepal",
      description: "Home of Mount Everest",
      image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80"
    },
    {
      name: "New York",
      description: "The big apple of dreams",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80"
    },
    {
      name: "Dubai",
      description: "Treasured gem of thousands",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80"
    },
    {
      name: "London",
      description: "The timeless city of dreams",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80"
    }
  ]

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const baseUrl = import.meta.env.BACKENDURL
        console.log("url", baseUrl);
        const res = await fetch("http://46.62.160.188:3000/states?isActive=true")
        if (!res.ok) throw new Error("Failed to fetch destinations")
        const data = await res.json()

        // Transform API data into the same structure as fallbackDestinations
        const apiDestinations: Destination[] = data.map((item: any) => ({
          name: item.name,
          description: item.tagline || "",
          image: item.img_url || ""
        }))

        //setDestinations(apiDestinations);

        // Fill the rest of slots with fallback destinations if API has fewer
        const finalData = [...apiDestinations, ...fallbackDestinations].slice(0, 9)
        setDestinations(finalData)
      } catch (err: any) {
        console.error(err)
        //setDestinations(fallbackDestinations)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchStates()
  }, [])

  if (loading) return <div className="text-center py-16 text-gray-600">Loading destinations...</div>

  return (
    <div className="w-full bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Popular Destinations</h2>
          <p className="text-gray-600 text-base">
            We have selected some best locations around the world for you.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <Card destination={destinations[0]} size="extra-large" />
            <Card destination={destinations[2]} size="large" />
            <Card destination={destinations[4]} size="medium" />
            <Card destination={destinations[6]} size="extra-large" />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            <Card destination={destinations[1]} size="medium" />
            <Card destination={destinations[3]} size="large" />
            <Card destination={destinations[5]} size="medium" />
            <Card destination={destinations[7]} size="extra-large" />
            <Card destination={destinations[8]} size="medium" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ✨ Reusable Card Component
function Card({ destination, size }: { destination: Destination; size: "extra-large" | "large" | "medium" }) {
  if (!destination) return null
  const heightClass = 
    size === "extra-large" ? "h-120" : 
    size === "large" ? "h-75" : 
    "h-55"

  return (
    <div className={`relative group cursor-pointer overflow-hidden rounded-2xl ${heightClass}`}>
      <img
        src={destination.image}
        alt={destination.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute bottom-6 left-6 text-white">
        <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
        <p className="text-sm text-gray-200">{destination.description}</p>
      </div>
    </div>
  )
}