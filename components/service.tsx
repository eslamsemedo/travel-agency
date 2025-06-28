import React from 'react'
import { Headphones, Clock, Shield, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from 'next/image'


// const bg = '/imgs/1.jpg'

const service = () => {
  return (
    <>
      <div className="bg-white py-16 px-4 relative">
        {/* <Image
          src={bg}
          alt="world"
          fill
          priority
          className=" w-full h-full z-0"
        // style={{ objectFit: 'cover' }}
        /> */}
        <div className="max-w-7xl mx-auto z-10 items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Image collage */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4 h-[500px]">
                {/* Main image - Woman with hat */}
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <div className="w-24 h-24 bg-white/30 rounded-full"></div>
                    </div>
                    <div className="text-white text-sm">Traveler enjoying vacation</div>
                  </div>
                </div>

                {/* Mountain landscape with discount badge */}
                <div className="relative">
                  <div className="bg-gradient-to-b from-blue-300 to-green-400 rounded-3xl h-full flex items-end justify-center p-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-600 rounded-full mx-auto mb-2"></div>
                      <div className="text-white text-xs">Mountain Adventure</div>
                    </div>
                  </div>
                  {/* Discount badge */}
                  <div className="absolute -top-2 -right-2 bg-white rounded-full p-3 shadow-lg border-4 border-orange-400">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-500">50%</div>
                      <div className="text-xs text-orange-500 font-medium">Discount</div>
                    </div>
                  </div>
                </div>

                {/* Beach scene - spans full width */}
                <div className="col-span-2 bg-gradient-to-r from-teal-400 to-blue-400 rounded-3xl h-32 flex items-center justify-center">
                  <div className="text-white text-sm">Beautiful coastal destination</div>
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className=" relative z-10 space-y-8">
              {/* Header */}
              <div>
                <p className="text-blue-500 font-medium mb-2">About Company</p>
                <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                  Our Main Goal To Provide Best Travel Solutions
                </h2>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rutrum imperdiet rhoncus. Duis iaculis
                suscipit auctor. Aliquam vehicula, magna a elementum viverra, tellus mauris tempor elit, vitae pharetra
                turpis justo ut neque. Sed non venenatis turpis.
              </p>

              {/* Features grid */}
              <div className="grid grid-cols-2 gap-6">
                {/* Friendly Guide */}
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500 rounded-full p-3 flex-shrink-0">
                    <Headphones className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Friendly Guide</h3>
                    <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur</p>
                  </div>
                </div>

                {/* Save Time */}
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500 rounded-full p-3 flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Save Time</h3>
                    <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur</p>
                  </div>
                </div>

                {/* Safety Travel */}
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500 rounded-full p-3 flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Safety Travel</h3>
                    <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur</p>
                  </div>
                </div>

                {/* Best Price */}
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500 rounded-full p-3 flex-shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Best Price</h3>
                    <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium">
                  Discover More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default service





