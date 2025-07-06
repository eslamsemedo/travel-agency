import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { username, password } = await request.json();

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Find admin by username
    const admin = await Admin.findOne({ username, isActive: true });

    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Create JWT token
    console.log('Login - Creating JWT token...');
    console.log('Login - JWT_SECRET length:', process.env.JWT_SECRET?.length);
    
    const token = jwt.sign(
      { 
        id: admin._id, 
        username: admin.username, 
        role: admin.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    console.log('Login - Token created:', !!token);
    console.log('Login - Token length:', token.length);
    console.log('Login - Token preview:', token.substring(0, 20) + '...');

    // Create response with token in httpOnly cookie
    const response = NextResponse.json(
      { 
        message: 'Login successful',
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role
        }
      },
      { status: 200 }
    );

    // Set httpOnly cookie
    console.log('Login - Setting cookie...');
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Only secure in production
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      domain: process.env.NODE_ENV === 'production' ? undefined : 'localhost'
    });

    console.log('Login - Cookie set successfully');
    console.log('Login - Response headers:', Object.fromEntries(response.headers.entries()));

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 