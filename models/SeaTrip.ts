import mongoose, { Schema, Document } from 'mongoose';

export interface ISeaTrip extends Document {
  name: string;
  description: string;
  price: string;
  discount: string;
  start_time: string;
  end_time: string;
  transportation: string;
  total_price: string;
  image: string;
  video?: string;
}

const SeaTripSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Sea trip name is required'],
    trim: true,
    maxlength: [100, 'Sea trip name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Sea trip description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  price: {
    type: String,
    required: [true, 'Price is required'],
    trim: true
  },
  discount: {
    type: String,
    required: false,
    trim: true,
    default: '0'
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
  total_price: {
    type: String,
    required: [true, 'Total price is required'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Sea trip image is required'],
    trim: true
  },
  video: {
    type: String,
    required: false,
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.models.SeaTrip || mongoose.model<ISeaTrip>('SeaTrip', SeaTripSchema); 