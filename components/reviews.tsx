import React from 'react'
import { Star } from "lucide-react"


const reviews = () => {
  const testimonials = [
    {
      id: 1,
      rating: 5,
      text: "Lorem ipsum dolor amet consectetur adipiscing sed do eiusmod tempor incididunt labore et dolore magna aliqua ipsum suspen disse ultrices gravida Risus",
      name: "Amy Johnson",
      role: "Traveler",
    },
    {
      id: 2,
      rating: 5,
      text: "Lorem ipsum dolor amet consectetur adipiscing sed do eiusmod tempor incididunt labore et dolore magna aliqua ipsum suspen disse ultrices gravida Risus",
      name: "Luaka Smith",
      role: "Traveler",
    },
    {
      id: 3,
      rating: 5,
      text: "Lorem ipsum dolor amet consectetur adipiscing sed do eiusmod tempor incididunt labore et dolore magna aliqua ipsum suspen disse ultrices gravida Risus",
      name: "Mike Hardson",
      role: "Traveler",
    },
  ]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-gray-500 text-sm font-medium tracking-wider uppercase mb-2">REVIEW & TESTIMONIALS</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Top Reviews for <span className='text-orange-400'>MY</span><span className='text-blue-500'>SKY</span></h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Star Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <Star key={index} className="w-5 h-5 fill-orange-400 text-orange-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-600 text-center leading-relaxed mb-8">{testimonial.text}</p>

              {/* Customer Info */}
              <div className="text-center">
                <h4 className="font-bold text-gray-900 text-lg mb-1">{testimonial.name}</h4>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-2">
          <button className="w-3 h-3 rounded-full bg-orange-500"></button>
          <button className="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"></button>
          <button className="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"></button>
        </div>
      </div>
    </section>
  )
}

export default reviews




