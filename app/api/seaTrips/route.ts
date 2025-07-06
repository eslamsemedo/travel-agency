import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SeaTrip from '@/models/SeaTrip';

// GET /api/seaTrips - Get all sea trips
export async function GET() {
  try {
    await connectDB();
    const seaTrips = await SeaTrip.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: seaTrips,
      count: seaTrips.length
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch sea trips',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// POST /api/seaTrips - Create a new sea trip
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Validate required fields
    const { name, description, price, start_time, end_time, transportation, total_price, image } = body;
    
    if (!name || !description || !price || !start_time || !end_time || !transportation || !total_price || !image) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields: name, description, price, start_time, end_time, transportation, total_price, image'
      }, { status: 400 });
    }
    
    const seaTrip = await SeaTrip.create(body);
    
    return NextResponse.json({
      success: true,
      data: seaTrip,
      message: 'Sea trip created successfully'
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
      message: 'Failed to create sea trip',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 