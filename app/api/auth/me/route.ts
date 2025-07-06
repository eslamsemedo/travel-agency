import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value;
    console.log('Auth check - Token exists:', !!token);
    console.log('Auth check - Token length:', token?.length);

    if (!token) {
      console.log('Auth check - No token found');
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
      console.log('Auth check - Token verified:', !!decoded);
      console.log('Auth check - Decoded token:', { id: decoded?.id, username: decoded?.username });
    } catch (jwtError) {
      console.log('Auth check - JWT verification failed:', jwtError);
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    await connectDB();

    // Get admin info
    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin || !admin.isActive) {
      return NextResponse.json(
        { error: 'Admin not found or inactive' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        lastLogin: admin.lastLogin
      }
    });

  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 