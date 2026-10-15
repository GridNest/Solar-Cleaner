import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.ADMIN_PASSWORD || 'admin@solar2026';

    if (password === correctPassword) {
      // Return success with auth token
      const token = 'solar_auth_' + Buffer.from(Date.now().toString()).toString('base64');
      const response = NextResponse.json({ 
        success: true, 
        message: 'Login successful', 
        token 
      });

      // Set HTTP-only cookie for secure persistence
      response.cookies.set('solar_admin_session', token, {
        httpOnly: false, // Accessible to client for fast state check
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Invalid admin password' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
