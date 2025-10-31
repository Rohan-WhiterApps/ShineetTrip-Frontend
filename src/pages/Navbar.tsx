

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LoginModal } from "./Login/Loginpage"


export function Navbar() {
 
   const [isModalOpen, setIsModalOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <nav className="w-full fixed top-0 left-0 z-50 bg-white border-b border-gray-200 px-8 py-3 flex justify-between items-center shadow-sm h-[62px]">
        {/* Logo Section */}
        <div className="flex  ml-8 items-center gap-2 cursor-pointer" onClick={() => scrollToSection("home")}>
          <svg width="40" height="40" viewBox="0 0 48 48" className="flex-shrink-0">
            <polygon points="24,4 40,16 24,24 8,16" fill="#C9A961" />
            <polygon points="24,24 40,32 24,44 8,32" fill="#2C4A5E" />
            <g transform="translate(24, 24)">
              <line x1="-4" y1="0" x2="4" y2="0" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <polygon points="4,0 2,-2 2,2" fill="white" />
            </g>
          </svg>

          <div className="flex flex-col leading-tight">
            <div className="flex items-baseline gap-0">
              <span className="font-bold text-gray-800 text-base">SHINEE</span>
              <span className="font-bold text-amber-600 text-base">TRIP</span>
            </div>
            <div className="h-[3px] bg-amber-600 w-20"></div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex  items-center gap-10">
          <button
            onClick={() => scrollToSection("home")}
            className="text-gray-800 font-bold text-sm hover:text-amber-600 transition"
          >
            Home
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 text-gray-800 text-sm font-bold hover:text-amber-600 transition cursor-pointer">
                Our Hotels
                <ChevronDown size={14} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-44">
              <DropdownMenuItem onClick={() => scrollToSection("adventure")}>Luxury Hotels</DropdownMenuItem>
              <DropdownMenuItem onClick={() => scrollToSection("adventure")}>Budget Hotels</DropdownMenuItem>
              <DropdownMenuItem onClick={() => scrollToSection("adventure")}>Resort Packages</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            onClick={() => scrollToSection("difference")}
            className="text-gray-800 text-sm font-bold hover:text-amber-600 transition"
          >
            Our Offers
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="text-gray-800 text-sm font-bold hover:text-amber-600 transition"
          >
            Contact Us
          </button>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#D4AF64] text-white text-sm font-bold px-6 py-1.5 rounded-md shadow-md hover:brightness-110 transition-all duration-300 border border-[#e2c46e]"
        >
          Reserve Now
        </button>
      </nav>

     <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
