import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    // Test JWT creation
    const testToken = jwt.sign(
      { test: 'data', id: '123' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );
    
    // Test JWT verification
    const decoded = jwt.verify(testToken, process.env.JWT_SECRET || 'your-secret-key');
    
    return NextResponse.json({
      success: true,
      jwtSecretLength: process.env.JWT_SECRET?.length,
      tokenCreated: !!testToken,
      tokenLength: testToken.length,
      tokenVerified: !!decoded,
      decoded: decoded
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'JWT test failed', details: String(error) },
      { status: 500 }
    );
  }
} 