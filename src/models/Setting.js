import mongoose from 'mongoose';

const DEFAULT_PROJECTS = [
  {
    id: 'proj-1',
    title: '5 kW Residential Rooftop De-soiling',
    capacity: '5 kW System',
    location: 'Gomti Nagar, Lucknow',
    image: '/projects/solar_home.jpg',
    description: 'Thick dust and pollution film removed using demineralized RO water and soft rotary brushes. Generation boosted by 28%.',
    ctaText: 'Book Similar Home Cleaning',
  },
  {
    id: 'proj-2',
    title: '120 kW Industrial Warehouse Rooftop',
    capacity: '120 kW Industrial',
    location: 'Transport Nagar, Lucknow',
    image: '/projects/solar_commercial.jpg',
    description: 'Scheduled multi-technician shift with safety harnesses during non-operational hours. Full generation audit & GST tax invoice provided.',
    ctaText: 'Request Factory Survey',
  },
  {
    id: 'proj-3',
    title: '45 kW Apartment Society Common Solar',
    capacity: '45 kW RWA Plant',
    location: 'Amar Shaheed Path, Lucknow',
    image: '/projects/solar_society.jpg',
    description: 'Regular monthly AMC service for common lifts & water pumps solar system. High-resolution before & after photo report sent to RWA committee.',
    ctaText: 'Get Housing Society AMC',
  },
];

const SettingSchema = new mongoose.Schema(
  {
    // Global & Contact
    phone: {
      type: String,
      default: '919648847816',
      trim: true,
    },
    city: {
      type: String,
      default: 'Lucknow',
      trim: true,
    },
    ratePerKw: {
      type: Number,
      default: 100,
    },
    minCharge: {
      type: Number,
      default: 500,
    },
    gstin: {
      type: String,
      default: '',
      trim: true,
    },
    workingHours: {
      type: String,
      default: 'Mon – Sun: 7:00 AM – 7:00 PM',
    },
    notificationEmail: {
      type: String,
      default: '',
      trim: true,
    },
    isEmailAlertsActive: {
      type: Boolean,
      default: true,
    },

    // Hero Section Customization
    heroBadge: {
      type: String,
      default: 'Professional Solar Panel Cleaning in Lucknow',
    },
    heroTitle: {
      type: String,
      default: 'Clean panels.',
    },
    heroTitleHighlight: {
      type: String,
      default: 'More power. Lower bills.',
    },
    heroDescription: {
      type: String,
      default: 'Dust, bird droppings and pollution quietly cut your solar generation by up to 30%. We clean home rooftops, housing societies and commercial solar plants safely, with soft brushes and treated demineralized water, on a schedule that suits you.',
    },
    heroStat1Title: {
      type: String,
      default: 'Up to 30% Boost',
    },
    heroStat1Sub: {
      type: String,
      default: 'In daily energy output',
    },
    heroStat2Title: {
      type: String,
      default: 'Treated RO Water',
    },
    heroStat2Sub: {
      type: String,
      default: 'Soft scratch-free brushes',
    },
    heroStat3Title: {
      type: String,
      default: 'GST Invoices',
    },
    heroStat3Sub: {
      type: String,
      default: '& WhatsApp photo reports',
    },

    // Recent Projects / Work Gallery
    projects: {
      type: Array,
      default: DEFAULT_PROJECTS,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Setting || mongoose.model('Setting', SettingSchema);
