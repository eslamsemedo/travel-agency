import mongoose, { Schema, Document } from 'mongoose';

export interface ISafariTrip extends Document {
  name: string;
  description: string;
  price: string;
  image: string;
  start_time: string;
  end_time: string;
  transportation: string;
  video: string;
  total_price: string;
}

const SafariTripSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Safari trip name is required'],
    trim: true,
    maxlength: [100, 'Safari trip name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Safari trip description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  price: {
    type: String,
    required: [true, 'Price is required'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Safari trip image is required'],
    trim: true
  },
  start_time: {
    type: String,
    required: [true, 'Start time is required'],
    trim: true
  },
  end_time: {
    type: String,
    required: [true, 'End time is required'],
    trim: true
  },
  transportation: {
    type: String,
    required: [true, 'Transportation is required'],
    trim: true,
    maxlength: [100, 'Transportation cannot exceed 100 characters']
  },
  video: {
    type: String,
    required: false,
    trim: true
  },
  total_price: {
    type: String,
    required: [true, 'Total price is required'],
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.models.SafariTrip || mongoose.model<ISafariTrip>('SafariTrip', SafariTripSchema); 