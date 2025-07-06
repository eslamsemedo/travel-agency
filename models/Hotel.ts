import mongoose, { Schema, Document } from 'mongoose';

export interface IHotel extends Document {
  name: string;
  description: string;
  city: string;
  location: string;
  image: string;
  video?: string;
}

const HotelSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Hotel name is required'],
    trim: true,
    maxlength: [100, 'Hotel name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Hotel description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
    maxlength: [50, 'City name cannot exceed 50 characters']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    maxlength: [200, 'Location cannot exceed 200 characters']
  },
  image: {
    type: String,
    required: [true, 'Hotel image is required'],
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

export default mongoose.models.Hotel || mongoose.model<IHotel>('Hotel', HotelSchema); 