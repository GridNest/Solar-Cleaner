import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/db';
import Lead from '../../../models/Lead';
import { sendLeadNotificationEmail } from '../../../lib/mailer';

// In-memory fallback in case MongoDB Atlas is not yet linked in .env.local
let inMemoryLeadsFallback = [];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const db = await connectToDatabase();

    if (db) {
      let query = {};
      if (status && status !== 'all') {
        query.status = status;
      }
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { customerPhone: { $regex: search, $options: 'i' } },
          { address: { $regex: search, $options: 'i' } },
        ];
      }

      const leads = await Lead.find(query).sort({ createdAt: -1 });
      return NextResponse.json({ success: true, count: leads.length, data: leads });
    }

    // Graceful fallback to memory
    let filtered = [...inMemoryLeadsFallback];
    if (status && status !== 'all') {
      filtered = filtered.filter(l => l.status === status);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(l => 
        (l.name && l.name.toLowerCase().includes(q)) ||
        (l.customerPhone && l.customerPhone.includes(q)) ||
        (l.address && l.address.toLowerCase().includes(q))
      );
    }

    return NextResponse.json({ 
      success: true, 
      count: filtered.length, 
      data: filtered, 
      isFallback: true,
      message: 'MongoDB Atlas URI not set in .env.local; serving memory leads' 
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, customerPhone, address } = body;

    if (!name || !customerPhone || !address) {
      return NextResponse.json(
        { success: false, message: 'Please provide name, phone and address' },
        { status: 400 }
      );
    }

    let savedLead;
    const db = await connectToDatabase();

    if (db) {
      savedLead = await Lead.create(body);
      console.log('✅ Lead saved to MongoDB Atlas:', savedLead._id);
    } else {
      // In-memory fallback
      savedLead = {
        _id: 'local_' + Date.now(),
        ...body,
        status: 'new',
        createdAt: new Date().toISOString(),
      };
      inMemoryLeadsFallback.unshift(savedLead);
      console.log('ℹ️ Lead stored in memory fallback (configure MONGODB_URI for Atlas persistence)');
    }

    // Asynchronously trigger email notification (does not block user response)
    sendLeadNotificationEmail(savedLead).catch(err => {
      console.warn('Background mailer error:', err.message);
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Booking lead registered successfully', 
      data: savedLead 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
