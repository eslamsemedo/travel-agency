"use client"
import React from 'react'
import Image from 'next/image'
import { MapPin, Timer, CreditCard, CableCar, Search, Play, Plane, Hotel, Crown, Car, FileText, Users } from 'lucide-react'
const bg = '/imgs/1.jpg'

import { TypeAnimation } from 'react-type-animation'


const Hero = () => {
  return (
    <div id="hero" className="relative min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
        <Image
          src={bg}
          alt="Gym banner – man lifting weights"
          fill
          priority
          className="object-cover bg-cover bg-center w-full h-full"
          style={{ objectFit: 'cover' }}
        />

        <div className="absolute inset-0 bg-black/40" />

        {/* heading */}
        <div className="absolute inset-0 flex flex-col justify-center px-[10%] space-y-6 transform -translate-y-1/6 pointer-events-none">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg leading-tight">
            Find your <span className="text-orange-400">perfect getaway</span>
          </h1>

          <p className=" hidden md:block max-w-xl text-lg md:text-xl text-white/90">
            Hand-picked tours, bespoke experiences and 24/7 support — all at your fingertips.
          </p>

          <div className="flex space-x-4 pointer-events-auto">
            <button className="bg-orange-400 hover:bg-orange-500 transition-colors text-white font-semibold px-8 py-4 rounded-lg shadow-lg">
              Explore Tours
            </button>

            <button className="flex items-center space-x-2 text-white/90 hover:text-white">
              <Play className="w-6 h-6" />
              <span>Watch video</span>
            </button>
          </div>
        </div>

        {/* Features Showcase */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent pb-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {/* Flight Tickets */}
              <div className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
                <div className="bg-orange-400/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-400/30 transition-colors">
                  <Plane className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-white font-semibold text-sm">Flight Tickets</h3>
              </div>

              {/* Hotel Booking */}
              <div className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
                <div className="bg-blue-400/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-400/30 transition-colors">
                  <Hotel className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold text-sm">Hotel Booking</h3>
              </div>

              {/* VIP Lounge */}
              <div className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
                <div className="bg-purple-400/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-400/30 transition-colors">
                  <Crown className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold text-sm">VIP Lounge</h3>
              </div>

              {/* Transportation */}
              <div className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
                <div className="bg-green-400/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 group-hover:bg-green-400/30 transition-colors">
                  <Car className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-white font-semibold text-sm">Transportation</h3>
              </div>

              {/* Visa & Tour Planning */}
              <div className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
                <div className="bg-red-400/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 group-hover:bg-red-400/30 transition-colors">
                  <FileText className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-white font-semibold text-sm">Visa & Tours</h3>
              </div>

              {/* Meet & Assist */}
              <div className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
                <div className="bg-pink-400/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 group-hover:bg-pink-400/30 transition-colors">
                  <Users className="w-6 h-6 text-pink-400" />
                </div>
                <h3 className="text-white font-semibold text-sm">Meet & Assist</h3>
              </div>
            </div>
          </div>
        </div>

      </div>
  )
}

export default Hero
