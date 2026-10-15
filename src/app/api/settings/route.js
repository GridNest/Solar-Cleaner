import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/db';
import Setting from '../../../models/Setting';

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

const DEFAULT_SETTINGS = {
  phone: '919648847816',
  city: 'Lucknow',
  ratePerKw: 100,
  minCharge: 500,
  gstin: '',
  workingHours: 'Mon – Sun: 7:00 AM – 7:00 PM',
  notificationEmail: '',
  isEmailAlertsActive: true,
  heroBadge: 'Professional Solar Panel Cleaning in Lucknow',
  heroTitle: 'Clean panels.',
  heroTitleHighlight: 'More power. Lower bills.',
  heroDescription: 'Dust, bird droppings and pollution quietly cut your solar generation by up to 30%. We clean home rooftops, housing societies and commercial solar plants safely, with soft brushes and treated demineralized water, on a schedule that suits you.',
  heroStat1Title: 'Up to 30% Boost',
  heroStat1Sub: 'In daily energy output',
  heroStat2Title: 'Treated RO Water',
  heroStat2Sub: 'Soft scratch-free brushes',
  heroStat3Title: 'GST Invoices',
  heroStat3Sub: '& WhatsApp photo reports',
  projects: DEFAULT_PROJECTS,
};

let inMemorySettingsFallback = { ...DEFAULT_SETTINGS };

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (db) {
      let settings = await Setting.findOne();
      if (!settings) {
        settings = await Setting.create(DEFAULT_SETTINGS);
      }
      return NextResponse.json({ success: true, data: settings });
    }

    return NextResponse.json({ success: true, data: inMemorySettingsFallback });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ success: false, data: inMemorySettingsFallback });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const db = await connectToDatabase();

    if (db) {
      let settings = await Setting.findOne();
      if (settings) {
        settings = await Setting.findByIdAndUpdate(settings._id, body, { new: true });
      } else {
        settings = await Setting.create({ ...DEFAULT_SETTINGS, ...body });
      }
      return NextResponse.json({ success: true, message: 'Settings saved', data: settings });
    }

    inMemorySettingsFallback = { ...inMemorySettingsFallback, ...body };
    return NextResponse.json({ 
      success: true, 
      message: 'Settings updated in memory session', 
      data: inMemorySettingsFallback 
    });
  } catch (error) {
    console.error('Error saving settings:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
