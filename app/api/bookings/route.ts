import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';

// GET /api/bookings - Get all bookings
export async function GET() {
  try {
    await connectDB();
    const bookings = await Booking.find().sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: bookings,
      message: 'Bookings retrieved successfully'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// POST /api/bookings - Create a new booking
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Validate required fields
    const { name, nationality, phoneNumber, tripId, tripType, tripName, tripPrice } = body;
    
    if (!name || !nationality || !phoneNumber || !tripId || !tripType || !tripName || !tripPrice) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields: name, nationality, phoneNumber, tripId, tripType, tripName, tripPrice'
      }, { status: 400 });
    }
    
    // Validate trip type
    if (!['hotel', 'seaTrip', 'safariTrip'].includes(tripType)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid trip type. Must be hotel, seaTrip, or safariTrip'
      }, { status: 400 });
    }
    
    const booking = await Booking.create({
      name,
      nationality,
      phoneNumber,
      tripId,
      tripType,
      tripName,
      tripPrice,
      status: 'pending'
    });
    
    return NextResponse.json({
      success: true,
      data: booking,
      message: 'Booking created successfully'
    }, { status: 201 });
  } catch (error) {
    
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({
        success: false,
        message: 'Validation error',
        error: error.message
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      message: 'Failed to create booking',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 