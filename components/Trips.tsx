import React from 'react'
import { Star, MapPin, Clock, Zap, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'

const Trips = () => {
  const tours = [
    {
      id: 1,
      image: "https://placehold.co/600x400.jpg",
      category: "Featured",
      categoryColor: "bg-blue-500",
      title: "Acropolis, Parthenon, Plaka District 3 Day Athens Tour",
      location: "Abu Dhabi, Dubai",
      duration: "3 Days - 4 Nights",
      rating: 4.8,
      reviews: 120,
      originalPrice: 300,
      currentPrice: 245,
      discount: "25% Off",
    },
    {
      id: 2,
      image: "https://placehold.co/600x400.jpg",
      category: "Discount",
      categoryColor: "bg-blue-500",
      title: "Eiffel Tower, Louvre Museum, Disneyland 5 Day Paris Tour",
      location: "Abu Dhabi, Dubai",
      duration: "3 Days - 5 Nights",
      rating: 4.8,
      reviews: 120,
      originalPrice: 300,
      currentPrice: 245,
      discount: "25% Off",
    },
    {
      id: 3,
      image: "https://placehold.co/600x400.jpg",
      category: "Featured",
      categoryColor: "bg-blue-500",
      title: "Big Ben, Buckingham Palace, British Museum London Tour",
      location: "Abu Dhabi, Dubai",
      duration: "3 Days - 4 Nights",
      rating: 4.8,
      reviews: 120,
      originalPrice: 300,
      currentPrice: 245,
      discount: "25% Off",
    },
    {
      id: 4,
      image: "https://placehold.co/600x400.jpg",
      category: "Popular",
      categoryColor: "bg-blue-500",
      title: "Brandenburg Gate, Berlin Wall, Museum Island Berlin Tour",
      location: "Abu Dhabi, Dubai",
      duration: "3 Days - 4 Nights",
      rating: 4.8,
      reviews: 120,
      originalPrice: 300,
      currentPrice: 245,
      discount: "25% Off",
    },
    {
      id: 5,
      image: "https://placehold.co/600x400.jpg",
      category: "Popular",
      categoryColor: "bg-blue-500",
      title: "Blue Mosque, Hagia Sophia, Grand Bazaar Istanbul Tour",
      location: "Abu Dhabi, Dubai",
      duration: "3 Days - 4 Nights",
      rating: 4.8,
      reviews: 120,
      originalPrice: 300,
      currentPrice: 245,
      discount: "25% Off",
    },
    {
      id: 6,
      image: "https://placehold.co/600x400.jpg",
      category: "Discount",
      categoryColor: "bg-blue-500",
      title: "Burj Khalifa, Dubai Mall, Desert Safari Dubai Tour",
      location: "Abu Dhabi, Dubai",
      duration: "3 Days - 4 Nights",
      rating: 4.8,
      reviews: 120,
      originalPrice: 300,
      currentPrice: 245,
      discount: "25% Off",
    },
  ]

  const filterButtons = [
    { label: "New", icon: null, active: true },
    { label: "Featured", icon: Zap, active: false },
    { label: "Discount", icon: Percent, active: false },
    { label: "Popular", icon: null, active: false },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <p className="text-blue-500 font-medium mb-2">Popular Tour</p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Amazing Tour Places</h1>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {filterButtons.map((button, index) => (
            <Button
              key={index}
              variant={button.active ? "default" : "outline"}
              className={`${button.active
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                } px-6 py-2 rounded-full font-medium`}
            >
              {button.icon && <button.icon className="w-4 h-4 mr-2" />}
              {button.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Tour Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <div
            key={tour.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={tour.image}
                alt={tour.title}
                // width={600}
                // height={400}
                fill
                className="w-full h-full object-cover" />
              <Badge className={`absolute top-3 left-3 ${tour.categoryColor} text-white px-3 py-1 text-sm font-medium`}>
                {tour.category}
              </Badge>
            </div>

            {/* Card Content */}
            <div className="p-5">
              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                  <span className="font-semibold text-gray-900">{tour.rating}</span>
                </div>
                <span className="text-gray-500 text-sm">({tour.reviews} Reviews)</span>
              </div>

              {/* Title */}
              <h3 className="font-bold text-gray-900 text-lg mb-3 line-clamp-2">{tour.title}</h3>

              {/* Location and Duration */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span>{tour.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span>{tour.duration}</span>
                </div>
              </div>

              {/* Discount Badge */}
              <div className="mb-4">
                <Badge className="bg-red-500 text-white px-2 py-1 text-xs font-medium">{tour.discount}</Badge>
              </div>

              {/* Price and Book Button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-blue-600">${tour.currentPrice}</span>
                  <span className="text-gray-400 line-through text-sm">${tour.originalPrice}</span>
                  <span className="text-gray-500 text-sm">/ Person</span>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium">
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Trips





