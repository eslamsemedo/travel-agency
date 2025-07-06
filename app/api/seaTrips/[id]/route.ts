import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SeaTrip from '@/models/SeaTrip';

// GET /api/seaTrips/[id] - Get a specific sea trip
// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await connectDB();
//     const seaTrip = await SeaTrip.findById(params.id);
    
//     if (!seaTrip) {
//       return NextResponse.json({
//         success: false,
//         message: 'Sea trip not found'
//       }, { status: 404 });
//     }
    
//     return NextResponse.json({
//       success: true,
//       data: seaTrip
//     }, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching sea trip:', error);
//     return NextResponse.json({
//       success: false,
//       message: 'Failed to fetch sea trip',
//       error: error instanceof Error ? error.message : 'Unknown error'
//     }, { status: 500 });
//   }
// }

// PUT /api/seaTrips/[id] - Update a specific sea trip
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } 
) {
  const { id } = await params;
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
    
    const seaTrip = await SeaTrip.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!seaTrip) {
      return NextResponse.json({
        success: false,
        message: 'Sea trip not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: seaTrip,
      message: 'Sea trip updated successfully'
    }, { status: 200 });
  } catch (error) {
    console.error('Error updating sea trip:', error);
    
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({
        success: false,
        message: 'Validation error',
        error: error.message
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      message: 'Failed to update sea trip',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// DELETE /api/seaTrips/[id] - Delete a specific sea trip
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } 
) {
  const { id } = await params;
  try {
    await connectDB();
    const seaTrip = await SeaTrip.findByIdAndDelete(id);
    
    if (!seaTrip) {
      return NextResponse.json({
        success: false,
        message: 'Sea trip not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Sea trip deleted successfully'
    }, { status: 200 });
  } catch (error) {
    console.error('Error deleting sea trip:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to delete sea trip',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 