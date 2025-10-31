"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface Amenity {
  category: string
  items: string[]
}

const amenities: Amenity[] = [
  {
    category: "Climate Control",
    items: ["Air-conditioning"],
  },
  {
    category: "Entertainment",
    items: ["TV"],
  },
  {
    category: "General Amenities",
    items: ["Daily Housekeeping", "Phone"],
  },
  {
    category: "Internet",
    items: ["High-speed Wi-Fi"],
  },
  {
    category: "Kitchen Features",
    items: ["Free Bottled Water", "Mini Bar", "Tea/coffee Making Facilities"],
  },
  {
    category: "Laundry Facilities",
    items: ["Guest Laundry Facility"],
  },
  {
    category: "Room Features & Facilities",
    items: ["Non Smoking Rooms"],
  },
]

interface RoomDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  roomName?: string
  roomImages?: string[]
}

export function RoomDetailsModal({
  isOpen,
  onClose,
  roomName = "Standard Room",
  roomImages = [
    "/luxury-bedroom-with-king-bed-and-garden-view.jpg",
    "/luxury-bedroom-with-king-bed-and-garden-view.jpg",
    "/luxury-bedroom-with-king-bed-and-garden-view.jpg",
    "/luxury-bedroom-with-king-bed-and-garden-view.jpg",
  ],
}: RoomDetailsModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? roomImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === roomImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
          w-[4000px] max-w-[95vw] 
          h-[90%] 
          overflow-y-auto 
          overflow-x-hidden 
          p-0 border-0 bg-white rounded-lg"
      >
        {/* Header */}
        <div className="flex items-center justify-start px-8 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-gray-800 text-[18px] font-medium">{roomName}</h2>
        </div>

        {/* Image Slider */}
        <div className="relative w-full bg-black/5">
          <div className="relative overflow-hidden" style={{ height: "350px" }}>
            <img
              src={roomImages[currentImageIndex] || "/placeholder.svg"}
              alt="Room"
              className="w-full h-full object-cover"
            />

            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-md hover:bg-white transition"
            >
              <ChevronLeft className="text-gray-800 w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-md hover:bg-white transition"
            >
              <ChevronRight className="text-gray-800 w-5 h-5" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 px-8 py-4 justify-start flex-wrap">
            {roomImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentImageIndex(i)}
                className={`relative w-[200px] h-[130px] rounded-md overflow-hidden border-2 transition-all ${
                  i === currentImageIndex ? "border-yellow-500" : "border-transparent"
                }`}
              >
                <img src={img} alt={`Room ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Room Description */}
        <div className="px-10 py-8 text-gray-800">
          <p className="text-[15px] leading-relaxed mb-12">
            The {roomName === "Standard Room" ? "Executive King Rooms" : roomName} at Raj Bhavan Clarks Inn are lavish
            living spaces spanning 270 sq. ft. They are some of the best rooms near Velachery, which can accommodate a
            maximum of 2 adults and 1 child. They come with the option of a single bed or a king size bed. These fully
            air-conditioned rooms are loaded with modern amenities such as a workstation with complimentary access to a
            stable high-speed internet connection, a 32" flat screen LCD TV, a tea & coffee maker, a hair dryer and an
            in-room minibar which is stacked with items you can purchase. To enhance your stay in these Chennai rooms,
            we also offer a complimentary breakfast, dedicated laundry service and our signature 24-hour room service.
          </p>

          {/* Amenities */}
          <div className="grid grid-cols-3 gap-x-16 gap-y-10">
            {amenities.map((amenity, i) => (
              <div key={i}>
                <h3 className="text-[15px] font-semibold mb-3">{amenity.category}</h3>
                <ul className="space-y-1.5">
                  {amenity.items.map((item, j) => (
                    <li key={j} className="text-[14px] text-gray-600">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
