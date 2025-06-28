"use client"
import React from 'react'
import { Facebook, Twitter, Instagram, Youtube, X, Send, MapPin, ChevronDown, ShoppingCart, Search, Menu, Phone } from 'lucide-react'
import Image from 'next/image';


const Header = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const handleMenuClick = () => {
    // Logic to handle menu click, e.g., toggle a sidebar or dropdown
    setMenuOpen(!menuOpen);
  }
  return (
    <div
      className='w-full bg-blue-600 relative h-[80px]'
    >
      <div className="flex flex-col sm:flex-row justify-between items-center w-[95%] sm:w-[80%] mx-auto py-2 text-white gap-2 sm:gap-1">
        <div className="text-xs md:text-base text-center md:text-left">
          <p className="flex flex-col md:flex-row items-center gap-1 md:gap-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" /> Home
            </span>
            <span className="hidden md:inline">|</span>
            <span className="flex items-center gap-1">
              <Send className="w-4 h-4" /> Support@Example.com
            </span>
          </p>
        </div>
        <div className="flex gap-2 flex-row justify-center">
          <Facebook className="w-4 h-4 md:w-5 md:h-5" />
          <Twitter className="w-4 h-4 md:w-5 md:h-5" />
          <Instagram className="w-4 h-4 md:w-5 md:h-5" />
          <Youtube className="w-4 h-4 md:w-5 md:h-5" />
        </div>
      </div>
      <div className=' absolute flex justify-between items-center p-5 md:top-[50%] md:w-[90%] w-full md:rounded-tr-full md:rounded-br-full h-full bg-white'>
        {/* Left - Logo and Nav */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-4 overflow-hidden">
            <div className="w-[60px] h-[60px] rounded-full bg-orange-400 flex items-center justify-center text-white">
              <Image

                src={"/imgs/logo4.png"} // Replace with your logo path
                alt="Logo"
                width={100}
                height={100}
                className="object-cover scale-125"
              />
            </div>
            <span className="text-2xl font-bold">
              <span className="text-orange-400">MY</span><span className="text-blue-600">SKY</span>
            </span>
          </div>
          {/* 1135 */}
          {/* Nav Links */}
        </div>
        <div className="flex items-center gap-6">

          <ul className="max-[1135px]:hidden flex items-center gap-6 text-black font-medium">
            <li className="cursor-pointer flex items-center gap-2">Home</li>
            <li className="cursor-pointer flex items-center gap-2">Destination</li>
            <li className="cursor-pointer flex items-center gap-2">Tour</li>
            <li className="cursor-pointer flex items-center gap-2">Blog</li>
            <li className="cursor-pointer flex items-center gap-2">Pages</li>
            <li className="cursor-pointer flex items-center gap-2">Contact</li>
          </ul>
        </div>

        {/* Right - Contact, Cart, Search, Button */}
        <div className="flex items-center gap-6 h-full">
          {/* Call Info */}
          <div className="flex items-center space-x-2 max-[650px]:hidden">
            <div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center text-white">
              <Phone className="w-6 h-6" />
            </div>
            <div className="text-sm ">
              <p className="text-gray-600">Call Anytime</p>
              <p className="font-bold">+20 1099600120</p>
            </div>
          </div>

          {/* Cart and Search */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-black" />
              <span className="absolute -top-2 -right-2 bg-orange-400 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
            </div>

            <div>
              <Search className="w-5 h-5 text-black" />
            </div>
          </div>

          {/* Booking Button */}
          <button className="max-[650px]:hidden bg-orange-400 text-white px-3 py-2 h-full rounded-full font-semibold">
            Booking Now
          </button>
          {/* the menu buttom with slider to review the options */}
          <div className="min-[1135px]:hidden">
            <button
              onClick={() => handleMenuClick()}
              className="p-2 rounded-full bg-orange-400 text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* mobile */}
      <div
        className={`
          fixed inset-0 z-50 w-full h-full bg-white
          transform transition-all duration-300 ease-in-out
          ${menuOpen ? "translate-x-0 md:translate-x-1/2" : "translate-x-full"}
          p-6
        `}
        style={{ willChange: 'transform', pointerEvents: menuOpen ? 'auto' : 'none', visibility: menuOpen ? 'visible' : 'hidden' }}
      >
        {/* Add your mobile menu content here */}
        <div className="flex flex-col items-start justify-start h-full relative">
          <button
            onClick={handleMenuClick}
            className="absolute flex flex-row top-4 left-4 bg-orange-400 text-white px-4 py-2 rounded-full font-semibold z-50"
            aria-label="Close menu"
          >
            <X /> Close
          </button>
          <ul className="space-y-4 text-lg font-medium mt-16">
            <li className="cursor-pointer flex items-center gap-2">Home</li>
            <li className="cursor-pointer flex items-center gap-2">Destination</li>
            <li className="cursor-pointer flex items-center gap-2">Tour</li>
            <li className="cursor-pointer flex items-center gap-2">Blog</li>
            <li className="cursor-pointer flex items-center gap-2">Pages</li>
            <li className="cursor-pointer flex items-center gap-2">Contact</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
