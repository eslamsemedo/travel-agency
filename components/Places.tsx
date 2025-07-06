import React from 'react'
import Image from "next/image"
import { Button } from "@/components/ui/button"

const Places = () => {
  const destinations = [
    {
      name: "France",
      trips: 40,
      image: "/world/france.jpg",
    },
    {
      name: "Egypt",
      trips: 30,
      image: "/world/egypt.jpg",
    },
    {
      name: "Bangladesh",
      trips: 23,
      image: "/world/Bangladesh.jpg",
    },
    {
      name: "Australia",
      trips: 18,
      image: "/world/Australia.jpg",
    },
    {
      name: "China",
      trips: 24,
      image: "/world/china.jpg",
    },
    {
      name: "Russia",
      trips: 22,
      image: "/world/russia.jpg",
    },
    {
      name: "India",
      trips: 20,
      image: "/world/india.jpg",
    },
    {
      name: "Germany",
      trips: 15,
      image: "/world/german.jpg",
    },
  ]

  return (
    <div id="places" className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-blue-500 text-sm font-medium mb-2">Destinations</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Explore the Beautiful Places
            <br />
            Around World
          </h1>
        </div>
        <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0">
          Book Your Flight Now
        </Button>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((destination, index) => (
          <div
            key={index}
            className="relative group cursor-pointer rounded-2xl overflow-hidden h-64 bg-gradient-to-b from-transparent to-black/60"
          >
            {/* Background Image */}
            <Image
              src={destination.image || "/placeholder.svg"}
              alt={destination.name}
              // width={600}
              // height={400}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />

            {/* Trip Count Badge */}
            {/* <div className="absolute top-4 right-4 bg-white rounded-full w-12 h-12 flex flex-col items-center justify-center shadow-lg">
              <span className="text-blue-600 font-bold text-sm">{destination.trips}</span>
              <span className="text-blue-600 text-xs">Trips</span>
            </div> */}

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-orange-400 text-xs font-semibold tracking-wider mb-1">TRAVEL TO</p>
              <h3 className="text-white text-xl font-bold">{destination.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Places







