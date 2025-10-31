"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Loader2, X } from "lucide-react"
import { signInWithFacebook, signInWithGoogle } from "@/Firebase/firebasevalidation"
import { PhoneLoginForm } from "./phone.login.form"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

const GoogleLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
    <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4"/>
    <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853"/>
    <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04"/>
    <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335"/>
  </svg>
)

const AppleLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
  </svg>
)

const EmailLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
)

const FacebookLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073C0 18.06 4.388 23.023 10.125 23.923v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [socialLoading, setSocialLoading] = useState<string | null>(null)

  const handleGoogleLogin = async () => {
    setSocialLoading("google")
    try {
      const user = await signInWithGoogle()
      if (user) {
        console.log("user details from google", user)
        onClose()
      }
    } catch (error: any) {
      alert("Google login failed. Please try again.")
    } finally {
      setSocialLoading(null)
    }
  }

  const handleFacebookLogin = async () => {
    setSocialLoading("facebook")
    try {
      const user = await signInWithFacebook()
      if (user) onClose()
    } catch (error: any) {
      alert("Facebook login failed. Please try again.")
    } finally {
      setSocialLoading(null)
    }
  }

  const handleAppleLogin = async () => {
    setSocialLoading("apple")
    try {
      // Add Apple sign-in logic here
      alert("Apple sign-in coming soon!")
    } catch (error: any) {
      alert("Apple login failed. Please try again.")
    } finally {
      setSocialLoading(null)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 border-0 max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">Log in or sign up</h1>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Welcome to Shinee Trip</h2>

          {/* Phone Login Form */}
          <PhoneLoginForm onSuccess={onClose} />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleGoogleLogin}
              disabled={!!socialLoading}
              className="w-full h-14 border-2 border-gray-900 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors font-semibold text-gray-900 disabled:opacity-50"
            >
              {socialLoading === "google" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <GoogleLogo />
              )}
              Continue with Google
            </button>

            <button
              onClick={handleAppleLogin}
              disabled={!!socialLoading}
              className="w-full h-14 border-2 border-gray-900 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors font-semibold text-gray-900 disabled:opacity-50"
            >
              {socialLoading === "apple" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <AppleLogo />
              )}
              Continue with Apple
            </button>

            <button
              onClick={handleGoogleLogin}
              disabled={!!socialLoading}
              className="w-full h-14 border-2 border-gray-900 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors font-semibold text-gray-900 disabled:opacity-50"
            >
              <EmailLogo />
              Continue with email
            </button>

            <button
              onClick={handleFacebookLogin}
              disabled={!!socialLoading}
              className="w-full h-14 border-2 border-gray-900 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors font-semibold text-gray-900 disabled:opacity-50"
            >
              {socialLoading === "facebook" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <FacebookLogo />
              )}
              Continue with Facebook
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}