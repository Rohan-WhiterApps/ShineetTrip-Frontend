import { useState } from "react"

interface Destination {
  name: string
  description: string
  image: string
}

export default function PopularDestinations() {
  const destinations: Destination[] = [
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

  return (
    <div className="w-full bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Popular Destinations</h2>
          <p className="text-gray-600 text-base">We have selected some best locations around the world for you.</p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Large Cards */}
          <div className="flex flex-col gap-6">
            {/* Mumbai - Large */}
            <div className="relative group cursor-pointer overflow-hidden rounded-2xl h-64">
              <img
                src={destinations[0].image}
                alt={destinations[0].name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-1">{destinations[0].name}</h3>
                <p className="text-sm text-gray-200">{destinations[0].description}</p>
              </div>
            </div>

            {/* Kerala - Large */}
            <div className="relative group cursor-pointer overflow-hidden rounded-2xl h-64">
              <img
                src={destinations[3].image}
                alt={destinations[3].name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-1">{destinations[3].name}</h3>
                <p className="text-sm text-gray-200">{destinations[3].description}</p>
              </div>
            </div>

            {/* Nepal - Large */}
            <div className="relative group cursor-pointer overflow-hidden rounded-2xl h-64">
              <img
                src={destinations[5].image}
                alt={destinations[5].name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-1">{destinations[5].name}</h3>
                <p className="text-sm text-gray-200">{destinations[5].description}</p>
              </div>
            </div>

            {/* Dubai - Large */}
            <div className="relative group cursor-pointer overflow-hidden rounded-2xl h-64">
              <img
                src={destinations[7].image}
                alt={destinations[7].name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-1">{destinations[7].name}</h3>
                <p className="text-sm text-gray-200">{destinations[7].description}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Mixed Sizes */}
          <div className="flex flex-col gap-6">
            {/* Paris - Medium */}
            <div className="relative group cursor-pointer overflow-hidden rounded-2xl h-40">
              <img
                src={destinations[1].image}
                alt={destinations[1].name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-1">{destinations[1].name}</h3>
                <p className="text-sm text-gray-200">{destinations[1].description}</p>
              </div>
            </div>

            {/* Kyoto - Medium */}
            <div className="relative group cursor-pointer overflow-hidden rounded-2xl h-40">
              <img
                src={destinations[2].image}
                alt={destinations[2].name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-1">{destinations[2].name}</h3>
                <p className="text-sm text-gray-200">{destinations[2].description}</p>
              </div>
            </div>

            {/* Hyderabad - Large */}
            <div className="relative group cursor-pointer overflow-hidden rounded-2xl h-64">
              <img
                src={destinations[4].image}
                alt={destinations[4].name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-1">{destinations[4].name}</h3>
                <p className="text-sm text-gray-200">{destinations[4].description}</p>
              </div>
            </div>

            {/* New York - Medium */}
            <div className="relative group cursor-pointer overflow-hidden rounded-2xl h-40">
              <img
                src={destinations[6].image}
                alt={destinations[6].name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-1">{destinations[6].name}</h3>
                <p className="text-sm text-gray-200">{destinations[6].description}</p>
              </div>
            </div>

            {/* London - Medium */}
            <div className="relative group cursor-pointer overflow-hidden rounded-2xl h-40">
              <img
                src={destinations[8].image}
                alt={destinations[8].name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-1">{destinations[8].name}</h3>
                <p className="text-sm text-gray-200">{destinations[8].description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}