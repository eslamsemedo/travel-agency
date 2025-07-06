import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SafariTrip from '@/models/SafariTrip';

// GET /api/safariTrips/[id] - Get a specific safari trip
// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await connectDB();
//     const safariTrip = await SafariTrip.findById(params.id);
    
//     if (!safariTrip) {
//       return NextResponse.json({
//         success: false,
//         message: 'Safari trip not found'
//       }, { status: 404 });
//     }
    
//     return NextResponse.json({
//       success: true,
//       data: safariTrip
//     }, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching safari trip:', error);
//     return NextResponse.json({
//       success: false,
//       message: 'Failed to fetch safari trip',
//       error: error instanceof Error ? error.message : 'Unknown error'
//     }, { status: 500 });
//   }
// }

// PUT /api/safariTrips/[id] - Update a specific safari trip
export async function PUT(
  request: NextRequest,
  { params: { id } }: { params: { id: string } } 
) {
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
    
    const safariTrip = await SafariTrip.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!safariTrip) {
      return NextResponse.json({
        success: false,
        message: 'Safari trip not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: safariTrip,
      message: 'Safari trip updated successfully'
    }, { status: 200 });
  } catch (error) {
    console.error('Error updating safari trip:', error);
    
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({
        success: false,
        message: 'Validation error',
        error: error.message
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      message: 'Failed to update safari trip',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// DELETE /api/safariTrips/[id] - Delete a specific safari trip
export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } } 
) {
  try {
    await connectDB();
    const safariTrip = await SafariTrip.findByIdAndDelete(id);
    
    if (!safariTrip) {
      return NextResponse.json({
        success: false,
        message: 'Safari trip not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Safari trip deleted successfully'
    }, { status: 200 });
  } catch (error) {
    console.error('Error deleting safari trip:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to delete safari trip',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 