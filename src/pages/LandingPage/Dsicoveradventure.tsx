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

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const baseUrl = import.meta.env.BACKENDURL
        console.log("url", baseUrl);
        const res = await fetch("http://46.62.160.188:3000/states?isActive=true")
        if (!res.ok) throw new Error("Failed to fetch destinations")
        const data = await res.json()

        // Transform API data into the required structure
        const apiDestinations: Destination[] = data.map((item: any) => ({
          name: item.name,
          description: item.tagline || "The glorious city of Nizam's",
          image: item.img_url || ""
        }))

        setDestinations(apiDestinations)
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
    const searchQuery = new URLSearchParams({
      location: destinationName,
    }).toString();

    console.log("Navigating to:", `/hotellists?${searchQuery}`);
    navigate(`/hotellists?${searchQuery}`);
  };

  if (loading) return <div className="text-center py-16 text-gray-600 font-opensans">Loading destinations...</div>

  if (error) return <div className="text-center py-16 text-red-600 font-opensans">Error: {error}</div>

  if (destinations.length === 0) return <div className="text-center py-16 text-gray-600 font-opensans">No destinations available</div>

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

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {destinations[0] && <Card destination={destinations[0]} height="h-[480px]" onClick={handleDestinationClick} />}
            {destinations[1] && <Card destination={destinations[1]} height="h-[235px]" onClick={handleDestinationClick} />}
            {destinations[2] && <Card destination={destinations[2]} height="h-[235px]" onClick={handleDestinationClick} />}
            {destinations[3] && <Card destination={destinations[3]} height="h-[485px]" onClick={handleDestinationClick} />}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {destinations[4] && <Card destination={destinations[4]} height="h-[235px]" onClick={handleDestinationClick} />}
            {destinations[5] && <Card destination={destinations[5]} height="h-[235px]" onClick={handleDestinationClick} />}
            {destinations[6] && <Card destination={destinations[6]} height="h-[480px]" onClick={handleDestinationClick} />}
            {destinations[7] && <Card destination={destinations[7]} height="h-[235px]" onClick={handleDestinationClick} />}
            {destinations[8] && <Card destination={destinations[8]} height="h-[235px]" onClick={handleDestinationClick} />}
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
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${destination.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'transform 0.5s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute bottom-6 left-6 text-white font-opensans">
        <h3 className="text-2xl font-bold mb-1 font-opensans">{destination.name}</h3>
        <p className="text-sm text-gray-200 font-opensans">{destination.description}</p>
      </div>
    </div>
  )
}