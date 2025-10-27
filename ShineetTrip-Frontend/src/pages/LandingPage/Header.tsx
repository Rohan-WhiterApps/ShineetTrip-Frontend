"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-header-bg/95 backdrop-blur-sm z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center">
              <span className="text-header-bg font-bold text-sm">S</span>
            </div>
            <span className="text-white font-bold text-lg">SHINEE TRIP</span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-8">
            <a href="#" className="text-muted-foreground hover:text-white transition">
              Home
            </a>
            <a href="#" className="text-muted-foreground hover:text-white transition">
              Our Trips
            </a>
            <a href="#" className="text-muted-foreground hover:text-white transition">
              Why Us
            </a>
            <a href="#" className="text-muted-foreground hover:text-white transition">
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-4">
            <a href="#" className="text-muted-foreground hover:text-white transition">
              Home
            </a>
            <a href="#" className="text-muted-foreground hover:text-white transition">
              Our Trips
            </a>
            <a href="#" className="text-muted-foreground hover:text-white transition">
              Why Us
            </a>
            <a href="#" className="text-muted-foreground hover:text-white transition">
              Contact
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}
