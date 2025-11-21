import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react"

interface Destination {
  name: string
  description: string
  image: string
}

export default function PopularDestinations() {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 🧠 Fallback (dummy) destinations - exact order for the pattern
  const fallbackDestinations: Destination[] = [
    {
      name: "Mumbai",
      description: "The glorious city of Nizam's",
      image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800&q=80"
    },
    {
      name: "New York",
      description: "The glorious city of Nizam's",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80"
    },
    {
      name: "Kerala",
      description: "The glorious city of Nizam's",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80"
    },
    {
      name: "New York",
      description: "The glorious city of Nizam's",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80"
    },
    {
      name: "Nepal",
      description: "The glorious city of Nizam's",
      image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80"
    },
    {
      name: "New York",
      description: "The glorious city of Nizam's",
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&q=80"
    },
    {
      name: "Dubai",
      description: "The glorious city of Nizam's",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80"
    },
    {
      name: "New York",
      description: "The glorious city of Nizam's",
      image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&q=80"
    },
    {
      name: "London",
      description: "The glorious city of Nizam's",
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
          description: item.tagline || "The glorious city of Nizam's",
          image: item.img_url || ""
        }))

        // Fill the rest of slots with fallback destinations if API has fewer
        const finalData = [...apiDestinations, ...fallbackDestinations].slice(0, 9)
        setDestinations(finalData)
      } catch (err: any) {
        console.error(err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchStates()
  }, [])

  const handleDestinationClick = (destinationName: string) => {
    console.log("Destination clicked:", destinationName);
    
    // Check if user is logged in
    const token = localStorage.getItem("shineetrip_token");
    if (!token) {
      console.warn("No token found - user needs to log in");
      alert("Please log in to search for hotels");
      return;
    }

    // Navigate to hotel listing page with only the location parameter
    // Don't send dates to avoid "Cannot search availability in the past" error
    const searchQuery = new URLSearchParams({
      location: destinationName,
    }).toString();

    console.log("Navigating to:", `/hotellists?${searchQuery}`);
    navigate(`/hotellists?${searchQuery}`);
  };

  if (loading) return <div className="text-center py-16 text-gray-600 font-opensans">Loading destinations...</div>

  return (
    <div className="w-full bg-gray-50 py-2 px-4 font-opensans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2 font-opensans">Popular Destinations</h2>
          <p className="text-gray-600 text-base font-opensans">
            We have selected some best locations around the world for you.
          </p>
        </div>

        {/* Grid Layout - Exact pattern from image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column - 4 cards */}
          <div className="flex flex-col gap-4">
            <Card destination={destinations[0]} height="h-[657px]" onClick={handleDestinationClick} />
            <Card destination={destinations[1]} height="h-[320px]" onClick={handleDestinationClick} />
            <Card destination={destinations[2]} height="h-[320px]" onClick={handleDestinationClick} />
            <Card destination={destinations[3]} height="h-[657px]" onClick={handleDestinationClick} />
          </div>

          {/* Right Column - 5 cards */}
          <div className="flex flex-col gap-4">
            <Card destination={destinations[4]} height="h-[320px]" onClick={handleDestinationClick} />
            <Card destination={destinations[5]} height="h-[320px]" onClick={handleDestinationClick} />
            <Card destination={destinations[6]} height="h-[657px]" onClick={handleDestinationClick} />
            <Card destination={destinations[7]} height="h-[320px]" onClick={handleDestinationClick} />
            <Card destination={destinations[8]} height="h-[320px]" onClick={handleDestinationClick} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ✨ Reusable Card Component
function Card({ 
  destination, 
  height, 
  onClick 
}: { 
  destination: Destination; 
  height: string;
  onClick: (name: string) => void;
}) {
  if (!destination) return null

  return (
    <div 
      className={`relative group cursor-pointer overflow-hidden rounded-[28px] ${height}`}
      onClick={() => onClick(destination.name)}
    >
      <img
        src={destination.image}
        alt={destination.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute bottom-6 left-6 text-white font-opensans">
        <h3 className="text-2xl font-bold mb-1 font-opensans">{destination.name}</h3>
        <p className="text-sm text-gray-200 font-opensans">{destination.description}</p>
      </div>
    </div>
  )
}
