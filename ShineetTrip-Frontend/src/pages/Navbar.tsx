import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Navbar() {
  return (
    <nav className="w-full">
      {/* Top Info Bar */}
      <div className="bg-slate-600 text-white px-6 py-2 flex justify-between items-center text-sm">
        <div className="flex gap-6">
          {/* Phone Number */}
          <div className="flex items-center gap-2">
            <span>📞</span>
            <span>+91 96 *** 43210</span>
          </div>
          {/* Email */}
          <div className="flex items-center gap-2">
            <span>✉️</span>
            <span>info@shineetrip.com</span>
          </div>
        </div>
        {/* Tagline */}
        <div className="text-amber-400 font-semibold">Himachal's Premier Luxury Travel Planner</div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
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

        <Button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-2 rounded">
          Reserve Now
        </Button>
      </div>
    </nav>
  )
}
