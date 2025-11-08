import { useState } from "react"
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
      <nav className="w-full fixed top-0 left-0 z-50 bg-white border-b border-gray-200 px-8 py-3 flex justify-between items-center shadow-sm h-[70px]">
        {/* Logo Section */}
        <div className="flex ml-8 items-center gap-2 cursor-pointer" onClick={() => scrollToSection("home")}>
          <svg width="45" height="45" viewBox="0 0 48 48" className="flex-shrink-0">
            <polygon points="24,4 40,16 24,24 8,16" fill="#C9A961" />
            <polygon points="24,24 40,32 24,44 8,32" fill="#2C4A5E" />
            <g transform="translate(24, 24)">
              <line x1="-4" y1="0" x2="4" y2="0" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <polygon points="4,0 2,-2 2,2" fill="white" />
            </g>
          </svg>

          <div className="flex flex-col leading-tight">
            <div className="flex items-baseline gap-0">
              <span className="font-bold text-gray-800 text-lg tracking-wide">SHINEE</span>
              <span className="font-bold text-amber-600 text-lg tracking-wide">TRIP</span>
            </div>
            <div className="h-[2px] bg-amber-600 w-24"></div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex items-center gap-8">
          <button className="flex items-center gap-2 text-gray-700 font-medium text-sm hover:text-amber-600 transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Hotels
          </button>

          <button className="flex items-center gap-2 text-gray-700 font-medium text-sm hover:text-amber-600 transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
            Flights
          </button>

          <button className="flex items-center gap-2 text-gray-700 font-medium text-sm hover:text-amber-600 transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="6" width="18" height="12" rx="2"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
              <line x1="8" y1="6" x2="8" y2="2"/>
              <line x1="16" y1="6" x2="16" y2="2"/>
            </svg>
            Trains
          </button>

          <button className="flex items-center gap-2 text-gray-700 font-medium text-sm hover:text-amber-600 transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
            Holiday Packages
          </button>

          <button className="flex items-center gap-2 text-gray-700 font-medium text-sm hover:text-amber-600 transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Events
          </button>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#C9A961] text-white text-sm font-semibold px-8 py-2.5 rounded-md shadow-md hover:bg-[#b89851] transition-all duration-300"
        >
          Login/Signup
        </button>
      </nav>

     <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}