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
        { 
          error: 'Admin already exists',
          admin: {
            username: existingAdmin.username,
            email: existingAdmin.email,
            role: existingAdmin.role
          }
        },
        { status: 400 }
      );
    }

    // Create default admin account
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const admin = new Admin({
      username: 'admin',
      password: hashedPassword,
      email: 'admin@travelagency.com',
      role: 'super_admin'
    });

    await admin.save();

    return NextResponse.json({
      message: 'Admin account created successfully!',
      admin: {
        username: admin.username,
        email: admin.email,
        role: admin.role
      },
      credentials: {
        username: 'admin',
        password: 'admin123'
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Setup admin error:', error);
    return NextResponse.json(
      { error: 'Failed to create admin account. Check your MongoDB connection.' },
      { status: 500 }
    );
  }
} 