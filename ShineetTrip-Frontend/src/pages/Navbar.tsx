import { ChevronDown } from "lucide-react"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Navbar() {
  return (
    <nav className="w-full">
      {/* Main Navbar */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <svg width="48" height="48" viewBox="0 0 48 48" className="flex-shrink-0">
            {/* Gold Top Half */}
            <polygon points="24,4 40,16 24,24 8,16" fill="#C9A961" />
            {/* Dark Teal Bottom Half */}
            <polygon points="24,24 40,32 24,44 8,32" fill="#2C4A5E" />
            {/* Arrow Detail */}
            <g transform="translate(24, 24)">
              <line x1="-4" y1="0" x2="4" y2="0" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <polygon points="4,0 2,-2 2,2" fill="white" />
            </g>
          </svg>

          {/* Logo Text */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-0">
              <span className="font-bold text-gray-800 text-lg">SHINEE</span>
              <span className="font-bold text-amber-600 text-lg">TRIP</span>
            </div>
            {/* Gold underline */}
            <div className="h-1 bg-amber-600 w-32 -mt-1"></div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex items-center gap-8">
          {/* Home Link */}
          <a href="#" className="text-gray-800 font-medium hover:text-amber-600 transition">
            Home
          </a>

          {/* Our Hotels Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 text-gray-800 font-medium hover:text-amber-600 transition cursor-pointer">
                Our Hotels
                <ChevronDown size={16} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem>Luxury Hotels</DropdownMenuItem>
              <DropdownMenuItem>Budget Hotels</DropdownMenuItem>
              <DropdownMenuItem>Resort Packages</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Our Offers Link */}
          <a href="#" className="text-gray-800 font-medium hover:text-amber-600 transition">
            Our Offers
          </a>

          {/* Contact Us Link */}
          <a href="#" className="text-gray-800 font-medium hover:text-amber-600 transition">
            Contact Us
          </a>
        </div>

        {/* Reserve Now Button */}
        <button
          className="bg-gradient-to-r from-[#f5d67b] via-[#dcb253] to-[#b98a2a] 
                     text-[#1b1b1b] font-semibold px-8 py-2 rounded-md shadow-md
                     hover:brightness-110 transition-all duration-300 
                     border border-[#e2c46e]"
        >
          Reserve Now
        </button>
      </div>
    </nav>
  )
}
