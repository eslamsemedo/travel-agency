import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    const token = request.cookies.get('admin_token')?.value;
    
    return NextResponse.json({
      jwtSecretExists: !!process.env.JWT_SECRET,
      jwtSecretLength: jwtSecret.length,
      tokenExists: !!token,
      tokenLength: token?.length || 0,
      nodeEnv: process.env.NODE_ENV
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Test failed' },
      { status: 500 }
    );
  }
} 