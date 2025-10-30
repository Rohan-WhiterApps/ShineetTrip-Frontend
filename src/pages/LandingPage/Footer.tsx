"use client"

import type React from "react"

import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail, Send } from "lucide-react"
import { useState } from "react"

export default function Footer() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle subscription logic here
    setEmail("")
  }

  return (
    <footer className="bg-[#2C3C3C] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Left Section - Logo & About */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-amber-600 rounded-full mr-1"></div>
                <span className="font-bold text-lg">
                  SHINEE<span className="text-[#D4A76A]">TRIP</span>
                </span>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Curating extraordinary journeys across India, Nepal & Bhutan. Where luxury meets adventure, and every
              moment is crafted to perfection since 2010.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[#D4A76A]" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#D4A76A]" />
                <span className="text-sm">info@shineetrip.com</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3">
              <a href="#" className="border border-gray-400 p-2 hover:border-amber-600 transition">
                <Facebook size={18} />
              </a>
              <a href="#" className="border border-gray-400 p-2 hover:border-amber-600 transition">
                <Instagram size={18} />
              </a>
              <a href="#" className="border border-gray-400 p-2 hover:border-amber-600 transition">
                <Twitter size={18} />
              </a>
              <a href="#" className="border border-gray-400 p-2 hover:border-amber-600 transition">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Our Offices */}
          <div>
            <h3 className="text-[#D4A76A] font-semibold mb-6 pb-2 border-b border-amber-600 inline-block">
              OUR OFFICES
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-[#D4A76A] transition">
                  Himachal Pradesh
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#D4A76A] transition">
                  Mumbai, Maharashtra
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#D4A76A] transition">
                  Chandigarh, Punjab
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#D4A76A] transition">
                  Kathmandu, Nepal
                </a>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-[#D4A76A] font-semibold mb-6 pb-2 border-b border-amber-600 inline-block">
              DESTINATIONS
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-amber-600 transition">
                  Shimla & Manali
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-600 transition">
                  Kasol & Kullu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-600 transition">
                  Nepal Tours
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-600 transition">
                  Bhutan Packages
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#D4A76A] font-semibold mb-6 pb-2 border-b border-amber-600 inline-block">
              QUICK LINKS
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-amber-600 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-600 transition">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-600 transition">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-600 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Stay Connected Section */}
        <div className="mb-12 pb-12 border-b border-gray-600">
          <h3 className="text-[#D4A76A] font-semibold mb-4 pb-2 border-b border-amber-600 inline-block">
            STAY CONNECTED
          </h3>
          <p className="text-gray-300 text-sm mb-4">Subscribe to receive exclusive travel offers and inspiration.</p>
          <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 bg-transparent border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:border-amber-600"
              required
            />
            <button
              type="submit"
              className="bg-[#D4A76A] hover:bg-amber-700 px-6 py-3 transition flex items-center justify-center"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-600 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© 2025 Shinee Trip. All Rights Reserved. | Crafted with passion for travel.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-amber-600 transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-amber-600 transition">
                Terms of Service
              </a>
              <a href="#" className="hover:text-amber-600 transition">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
