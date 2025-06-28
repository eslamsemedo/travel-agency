import React from 'react'
import Image from "next/image"
import { Button } from "@/components/ui/button"

const Places = () => {
  const destinations = [
    {
      name: "France",
      trips: 40,
      image: "https://placehold.co/600x400.jpg",
    },
    {
      name: "Egypt",
      trips: 30,
      image: "https://placehold.co/600x400.jpg",
    },
    {
      name: "Bangladesh",
      trips: 23,
      image: "https://placehold.co/600x400.jpg",
    },
    {
      name: "Australia",
      trips: 18,
      image: "https://placehold.co/600x400.jpg",
    },
    {
      name: "Pakistan",
      trips: 24,
      image: "https://placehold.co/600x400.jpg",
    },
    {
      name: "Indonesia",
      trips: 22,
      image: "https://placehold.co/600x400.jpg",
    },
    {
      name: "India",
      trips: 20,
      image: "https://placehold.co/600x400.jpg",
    },
    {
      name: "Germany",
      trips: 15,
      image: "https://placehold.co/600x400.jpg",
    },
  ]

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
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
        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full">Browse All</Button>
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
            <div className="absolute top-4 right-4 bg-white rounded-full w-12 h-12 flex flex-col items-center justify-center shadow-lg">
              <span className="text-blue-600 font-bold text-sm">{destination.trips}</span>
              <span className="text-blue-600 text-xs">Trips</span>
            </div>

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







