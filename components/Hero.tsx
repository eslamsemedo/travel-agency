"use client"
import React from 'react'
import Image from 'next/image'
import { MapPin, Timer, CreditCard, CableCar, Search, Play } from 'lucide-react'
const bg = '/imgs/1.jpg'

import { TypeAnimation } from 'react-type-animation'


const Hero = () => {
  return (
    <>
      <div className="w-full h-screen relative -z-10  ">
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


        <div className='absolute bottom-[5%] md:bottom-[20%] left-[5%] md:left-[10%] right-[5%] md:right-[10%] min-h-[100px] z-10 bg-white flex flex-col md:flex-row items-center justify-between rounded-lg overflow-hidden'>
          <div className="flex flex-col md:flex-row justify-between items-center p-2  divide-gray-200 h-full w-full">
            {/* Item */}
            <div className="flex items-center px-4 md:px-6 py-4 space-x-3 w-full md:w-auto">
              <MapPin className="w-5 h-5 md:w-6 md:h-6 text-orange-400" />
              <div>
                <p className="font-semibold text-black text-sm md:text-base">Destination</p>
                <p className="text-gray-500 text-xs md:text-sm">Where to Go ?</p>
              </div>
            </div>

            <div className="flex items-center px-4 md:px-6 py-4 space-x-3 w-full md:w-auto">
              <CableCar className="w-5 h-5 md:w-6 md:h-6 text-orange-400" />
              <div>
                <p className="font-semibold text-black text-sm md:text-base">Trip Type</p>
                <p className="text-gray-500 text-xs md:text-sm">Hiking</p>
              </div>
            </div>

            <div className="flex items-center px-4 md:px-6 py-4 space-x-3 w-full md:w-auto">
              <Timer className="w-5 h-5 md:w-6 md:h-6 text-orange-400" />
              <div>
                <p className="font-semibold text-black text-sm md:text-base">Duration</p>
                <p className="text-gray-500 text-xs md:text-sm">3 Days 5 Nights</p>
              </div>
            </div>

            <div className="flex items-center px-4 md:px-6 py-4 space-x-3 w-full md:w-auto">
              <CreditCard className="w-5 h-5 md:w-6 md:h-6 text-orange-400" />
              <div>
                <p className="font-semibold text-black text-sm md:text-base">Price</p>
                <p className="text-gray-500 text-xs md:text-sm">$200 - $3000</p>
              </div>
            </div>
            <button className="bg-orange-400 text-white font-semibold px-6 md:px-8 py-4 flex items-center justify-center space-x-2 h-full w-full md:w-auto rounded-lg ">
              <span className="text-sm md:text-base">Search</span>
              <Search className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>
          </div>
        </div>

      </div>
    </>
  )
}

export default Hero
