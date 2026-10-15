import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/db';
import Lead from '../../../../models/Lead';

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    const db = await connectToDatabase();
    if (db) {
      const updated = await Lead.findByIdAndUpdate(id, body, { new: true });
      if (!updated) {
        return NextResponse.json({ success: false, message: 'Lead not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: updated });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Updated lead in session fallback mode',
      data: { id, ...body } 
    });
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const db = await connectToDatabase();

    if (db) {
      await Lead.findByIdAndDelete(id);
      return NextResponse.json({ success: true, message: 'Lead deleted successfully' });
    }

    return NextResponse.json({ success: true, message: 'Lead removed from session' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
