import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Hotel from '@/models/Hotel';

// GET /api/hotels/[id] - Get a specific hotel
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const hotel = await Hotel.findById(params.id);
    
    if (!hotel) {
      return NextResponse.json({
        success: false,
        message: 'Hotel not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: hotel
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching hotel:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch hotel',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// PUT /api/hotels/[id] - Update a specific hotel
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    const hotel = await Hotel.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!hotel) {
      return NextResponse.json({
        success: false,
        message: 'Hotel not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: hotel,
      message: 'Hotel updated successfully'
    }, { status: 200 });
  } catch (error) {
    console.error('Error updating hotel:', error);
    
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({
        success: false,
        message: 'Validation error',
        error: error.message
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      message: 'Failed to update hotel',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// DELETE /api/hotels/[id] - Delete a specific hotel
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const hotel = await Hotel.findByIdAndDelete(params.id);
    
    if (!hotel) {
      return NextResponse.json({
        success: false,
        message: 'Hotel not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Hotel deleted successfully'
    }, { status: 200 });
  } catch (error) {
    console.error('Error deleting hotel:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to delete hotel',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 