import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  name: string;
  nationality: string;
  phoneNumber: string;
  tripId: string;
  tripType: 'hotel' | 'seaTrip' | 'safariTrip';
  tripName: string;
  tripPrice: string;
  bookingDate: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
}

const BookingSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  nationality: {
    type: String,
    required: [true, 'Nationality is required'],
    trim: true,
    maxlength: [50, 'Nationality cannot exceed 50 characters']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  tripId: {
    type: String,
    required: [true, 'Trip ID is required'],
    trim: true
  },
  tripType: {
    type: String,
    required: [true, 'Trip type is required'],
    enum: ['hotel', 'seaTrip', 'safariTrip'],
    trim: true
  },
  tripName: {
    type: String,
    required: [true, 'Trip name is required'],
    trim: true,
    maxlength: [200, 'Trip name cannot exceed 200 characters']
  },
  tripPrice: {
    type: String,
    required: [true, 'Trip price is required'],
    trim: true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema); 