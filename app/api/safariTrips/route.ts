import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SafariTrip from '@/models/SafariTrip';

// GET /api/safariTrips - Get all safari trips
export async function GET() {
  try {
    await connectDB();
    const safariTrips = await SafariTrip.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: safariTrips,
      count: safariTrips.length
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching safari trips:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch safari trips',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// POST /api/safariTrips - Create a new safari trip
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Validate required fields
    const { name, description, price, image, start_time, end_time, transportation, total_price } = body;
    
    if (!name || !description || !price || !image || !start_time || !end_time || !transportation || !total_price) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields: name, description, price, image, start_time, end_time, transportation, total_price'
      }, { status: 400 });
    }
    
    const safariTrip = await SafariTrip.create(body);
    
    return NextResponse.json({
      success: true,
      data: safariTrip,
      message: 'Safari trip created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating safari trip:', error);
    
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({
        success: false,
        message: 'Validation error',
        error: error.message
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      message: 'Failed to create safari trip',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 