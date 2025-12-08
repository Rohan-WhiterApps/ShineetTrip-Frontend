"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Star,
  Check,
  MapPin,
  Users,
  Calendar,
  Search,
  SlidersHorizontal,
} from "lucide-react";

interface Destination {
  name: string
  description: string
  image: string
}

// Helper to format date to YYYY-MM-DD for input value/default
const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};


export default function PopularDestinations() {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ✅ FIX: fetchStates ko simple function banaya, taki dependency issues resolve ho
  const fetchStates = async () => {
      try {
        const token = localStorage.getItem("shineetrip_token");
        
        // Headers ko conditionally banate hain
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        const res = await fetch("http://46.62.160.188:3000/home-pop-dests", {
            headers: headers 
        });
        
        if (!res.ok) {
            if (res.status === 401 || res.status === 403) {
                console.warn(`Destination fetch failed due to Auth: ${res.status}`);
                setError("Login token invalid or expired. Please sign in again.");
                return; 
            }
            throw new Error(`Failed to fetch destinations (Status: ${res.status})`);
        }
        
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
        setError(err.message || "Failed to load destinations due to network issue.")
      } finally {
        setLoading(false)
      }
  } // Removed useCallback and dependency array here

  useEffect(() => {
    
    fetchStates()
   
  }, []) 

  const handleDestinationClick = (destinationName: string) => {
    console.log("Destination clicked:", destinationName);
    
    // Check if user is logged in (already handled, just forwarding location)
    const searchQuery = new URLSearchParams({
      location: destinationName,
      checkIn: getTodayDateString(), // Default to today
      checkOut: getTodayDateString(), // Default to today
      adults: '2',
      children: '0'
    }).toString();

    navigate(`/hotellists?${searchQuery}`);
  };

  if (loading) return <div className="text-center py-16 text-gray-600 font-opensans">Loading destinations...</div>

  if (error) return <div className="text-center py-16 text-red-600 font-opensans">Error: {error}</div>

  if (destinations.length === 0) return <div className="text-center py-16 text-gray-600 font-opensans">No destinations available</div>

  return (
    <div className="w-full bg-white py-2 px-4 font-opensans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h2 className="text-[42px] leading-[20px] font-bold tracking-[0px] text-[#2C3C3C] mb-6 font-opensans align-middle">Popular Destinations</h2>
            <p className="text-[24px] leading-[20px] font-normal tracking-[0px] text-gray-600 font-opensans">
              We have selected some best locations around the world for you.
            </p>
          </div>
          <button 
            onClick={() => navigate('/hotellists')}
            className="bg-white border border-[#C9A86A] text-[#C9A86A] px-8 py-2 rounded-full font-opensans font-semibold text-[18px] leading-[20px] tracking-[0px] text-center hover:shadow-md transition-all whitespace-nowrap mb-2"
          >
            Explore
          </button>
        </div>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {destinations.map((destination, index) => (
              // Simplified Card mapping based on Figma layout structure
              <Card key={index} destination={destination} height="h-[250px]" onClick={handleDestinationClick} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ✨ Reusable Card Component (Placeholder implementation to make file runnable)
function Card({ 
  destination, 
  height, 
  onClick 
}: { 
  destination: Destination; 
  height: string;
  onClick: (name: string) => void;
}) {
  if (!destination || !destination.name) return null

  return (
    <div 
      className={`relative group cursor-pointer overflow-hidden rounded-[28px] ${height} shadow-lg`}
      onClick={() => onClick(destination.name)}
    >
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${destination.image || 'https://placehold.co/400x400/94a3b8/ffffff?text=DEST'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'transform 0.5s ease'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute bottom-6 left-6 text-white font-opensans">
        <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
        <p className="text-lg font-normal text-white">{destination.description}</p>
      </div>
    </div>
  )
}