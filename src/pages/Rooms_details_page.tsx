"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, X, Check, Users, Maximize2, Bed } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog" 

// Static amenity categories
const staticAmenities = [
  { category: "Climate Control", items: ["Air-conditioning"] },
  { category: "Entertainment", items: ["TV"] },
  { category: "General Amenities", items: ["Daily Housekeeping", "Phone"] },
  { category: "Internet", items: ["High-speed Wi-Fi"] },
  { category: "Kitchen Features", items: ["Free Bottled Water", "Mini Bar", "Tea/coffee Making Facilities"] },
  { category: "Laundry Facilities", items: ["Guest Laundry Facility"] },
  { category: "Room Features & Facilities", items: ["Non Smoking Rooms"] },
]

interface RoomDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  roomName: string
  roomImages: string[]
  roomData: any
}

export function RoomDetailsModal({
  isOpen,
  onClose,
  roomName = "Standard Room",
  roomImages = [],
  roomData
}: RoomDetailsModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // 🟢 SECTION 1: Dynamic Data Extraction from Swagger API
  // Swagger mein description HTML tags ke sath aati hai
  const description = roomData?.description || roomData?.short_description;
  
  // Swagger mein images 'images[].image' format mein hoti hain.images]
  const safeRoomImages = roomData?.images?.length > 0 
    ? roomData.images.map((img: any) => img.image) 
    : roomImages.length > 0 ? roomImages : ["https://placehold.co/600x400?text=No+Image"];

  // Occupancy configuration se max guests uthana.occupancyConfiguration]
  const occupancy = roomData?.occupancyConfiguration?.max_occ || roomData?.max_guests; 
  
  // Bed types array se bed ka naam uthana.bedTypes]
  const bedType = roomData?.bedTypes?.[0]?.bed_type_name || "Royal Bed";

  // Price retail_price se uthana.price]
  const price = roomData?.price?.retail_price || roomData?.rate;

  useEffect(() => {
    if (isOpen) setCurrentImageIndex(0)
  }, [isOpen])

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? safeRoomImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === safeRoomImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full sm:max-w-[900px] max-h-[90vh] overflow-hidden p-0 bg-white rounded-lg shadow-2xl">
        
        {/* Header Section */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 bg-white sticky top-0 z-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{roomData?.room_type || roomName}</h2>
            <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Maximize2 className="w-4 h-4" />
                  <span>200 sq.ft.</span>
                </div>
                {bedType && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Bed className="w-4 h-4" />
                    <span>{bedType}</span>
                  </div>
                )}
                {occupancy && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Max {occupancy} guests</span>
                  </div>
                )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {price && (
              <div className="text-right">
                <div className="text-sm text-gray-500">Starting from</div>
                {/* 🟢 Price Color Green (#1AB64F) as per your design */}
                <div className="text-xl font-bold text-[#1AB64F]">₹{Number(price).toLocaleString()}</div>
              </div>
            )}
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 80px)' }}>
          {/* Image Slider */}
          <div className="relative bg-gray-100 h-96">
              <img
                src={safeRoomImages[currentImageIndex]}
                alt="Room View"
                className="w-full h-full object-cover"
              />
              {safeRoomImages.length > 1 && (
                <>
                  <button onClick={goToPrevious} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition"><ChevronLeft className="w-5 h-5" /></button>
                  <button onClick={goToNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition"><ChevronRight className="w-5 h-5" /></button>
                </>
              )}
          </div>

          <div className="p-8">
            {/* 🟢 SECTION 2: HTML Description Rendering */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <div 
                className="text-gray-700 leading-relaxed text-sm md:text-base prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: description || '' }} // API se aane wale tags ko render karega
              />
            </div>

            {/* Static Amenities Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {staticAmenities.map((amenity, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-medium text-gray-900">{amenity.category}</h4>
                    <ul className="space-y-1">
                      {amenity.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="w-3 h-3 text-green-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}