"use client"

import { useState } from "react"
import { X, Mail } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Country {
  name: string
  code: string
  flag: string
  phone: string
}

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

const countries: Country[] = [
  { name: "India", code: "IN", flag: "🇮🇳", phone: "+91" },
  { name: "United States", code: "US", flag: "🇺🇸", phone: "+1" },
  { name: "United Kingdom", code: "UK", flag: "🇬🇧", phone: "+44" },
  { name: "Canada", code: "CA", flag: "🇨🇦", phone: "+1" },
  { name: "Australia", code: "AU", flag: "🇦🇺", phone: "+61" },
]

const GoogleLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <text x="2" y="18" fontSize="16" fontWeight="bold" fill="#EA4335">
      G
    </text>
  </svg>
)

const AppleLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.61-2.53 3.44l-.87.5z" />
  </svg>
)

const FacebookLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0])
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")

  const handleContinue = () => {
    console.log("Continue with:", { country: selectedCountry, phone, email })
  }

  const handleSocialLogin = (provider: string) => {
    console.log("Login with:", provider)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 border-0 max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Log in or sign up</h1>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Welcome Title */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome to Shinee Trip</h2>
          </div>

          {/* Country/Region Dropdown */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Country/Region</label>
            <Select
              value={selectedCountry.code}
              onValueChange={(code) => {
                const country = countries.find((c) => c.code === code)
                if (country) setSelectedCountry(country)
              }}
            >
              <SelectTrigger className="w-full h-12 border-gray-300 bg-white text-gray-900">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    <span className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span>
                        {country.name} ({country.phone})
                      </span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Phone number</label>
            <Input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-12 border-gray-300 text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email-Id</label>
            <Input
              type="email"
              placeholder="Enter your email-id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 border-gray-300 text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* Disclaimer */}
          <p className="text-sm text-gray-600">
            We'll call or text you to confirm your number. Standard message and data rates apply.{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </p>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            className="w-full h-12 bg-[#D4A76A] hover:bg-yellow-700 text-white font-semibold text-lg rounded-lg transition-colors"
          >
            Continue
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            {/* Google */}
            <button
              onClick={() => handleSocialLogin("google")}
              className="w-full h-12 border-2 border-gray-900 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors font-semibold text-gray-900"
            >
              <GoogleLogo />
              Continue with Google
            </button>

            {/* Apple */}
            <button
              onClick={() => handleSocialLogin("apple")}
              className="w-full h-12 border-2 border-gray-900 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors font-semibold text-gray-900"
            >
              <AppleLogo />
              Continue with Apple
            </button>

            {/* Email */}
            <button
              onClick={() => handleSocialLogin("email")}
              className="w-full h-12 border-2 border-gray-900 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors font-semibold text-gray-900"
            >
              <Mail size={20} />
              Continue with email
            </button>

            {/* Facebook */}
            <button
              onClick={() => handleSocialLogin("facebook")}
              className="w-full h-12 border-2 border-gray-900 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors font-semibold text-gray-900"
            >
              <FacebookLogo />
              Continue with Facebook
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
