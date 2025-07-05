import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Hotel from '@/models/Hotel';

// GET /api/hotels - Get all hotels
export async function GET() {
  try {
    await connectDB();
    const hotels = await Hotel.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: hotels,
      count: hotels.length
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch hotels',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// POST /api/hotels - Create a new hotel
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Validate required fields
    const { name, description, city, location, image } = body;
    
    if (!name || !description || !city || !location || !image) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields: name, description, city, location, image'
      }, { status: 400 });
    }
    
    const hotel = await Hotel.create(body);
    
    return NextResponse.json({
      success: true,
      data: hotel,
      message: 'Hotel created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating hotel:', error);
    
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({
        success: false,
        message: 'Validation error',
        error: error.message
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      message: 'Failed to create hotel',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 