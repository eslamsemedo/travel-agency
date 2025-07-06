import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Check if any admin already exists
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin already exists' },
        { status: 400 }
      );
    }

    const { username, password, email } = await request.json();

    // Validate input
    if (!username || !password || !email) {
      return NextResponse.json(
        { error: 'Username, password, and email are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Check if username or email already exists
    const existingUser = await Admin.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Username or email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create admin
    const admin = new Admin({
      username,
      password: hashedPassword,
      email,
      role: 'super_admin'
    });

    await admin.save();

    return NextResponse.json({
      message: 'Admin created successfully',
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 