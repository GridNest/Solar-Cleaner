import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide customer name'],
      trim: true,
    },
    customerPhone: {
      type: String,
      required: [true, 'Please provide customer phone number'],
      trim: true,
    },
    type: {
      type: String,
      default: 'Home owner',
      trim: true,
    },
    size: {
      type: Number,
      default: null,
    },
    address: {
      type: String,
      required: [true, 'Please provide customer address'],
      trim: true,
    },
    locationCoords: {
      type: String,
      default: '',
      trim: true,
    },
    plan: {
      type: String,
      default: 'One-time cleaning',
      trim: true,
    },
    estimateAmount: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: 'Lucknow',
    },
    source: {
      type: String,
      default: 'Website Booking Form',
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'scheduled', 'completed', 'cancelled'],
      default: 'new',
    },
    preferredDate: {
      type: String,
      default: '',
      trim: true,
    },
    preferredTime: {
      type: String,
      default: '',
      trim: true,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model recompilation error in Next.js hot reload
export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
