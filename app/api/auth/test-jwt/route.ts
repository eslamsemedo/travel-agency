import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    console.log('Test JWT - JWT_SECRET length:', process.env.JWT_SECRET?.length);
    console.log('Test JWT - JWT_SECRET preview:', process.env.JWT_SECRET?.substring(0, 20) + '...');
    
    // Test JWT creation
    const testToken = jwt.sign(
      { test: 'data', id: '123' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );
    
    console.log('Test JWT - Token created:', !!testToken);
    console.log('Test JWT - Token length:', testToken.length);
    
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
    console.error('Test JWT - Error:', error);
    return NextResponse.json(
      { error: 'JWT test failed', details: String(error) },
      { status: 500 }
    );
  }
} 