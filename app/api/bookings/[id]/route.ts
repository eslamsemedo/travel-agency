import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';

// GET /api/bookings/[id] - Get a specific booking
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    await connectDB();
    const booking = await Booking.findById(id);
    if (!booking) {
      return NextResponse.json({ success: false, message: 'Booking not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch booking', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

// PUT /api/bookings/[id] - Update booking status
export async function PUT(
  request: NextRequest,
  { params: { id } }: { params: { id: string } } 
) {
  try {
    await connectDB();
    const body = await request.json();
    const { status } = body;
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return NextResponse.json({ success: false, message: 'Invalid status value' }, { status: 400 });
    }
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    if (!booking) {
      return NextResponse.json({ success: false, message: 'Booking not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: booking, message: 'Booking status updated' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to update booking', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
} 