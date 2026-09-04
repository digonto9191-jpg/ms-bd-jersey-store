import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/shop
export async function GET() {
  try {
    const shopData = {
      success: true,
      data: {
        name: 'MS BD',
        tagline: 'Your Jersey. Your Team.',
        description: 'Premium football jerseys for club and national team fans',
        email: 'hello@msbd.example',
        phone: '+8801000000000',
        address: 'Dhaka, Bangladesh',
        businessHours: '10:00 AM - 9:00 PM',
        socialLinks: {
          facebook: 'https://facebook.com/msbd',
          instagram: 'https://instagram.com/msbd',
          twitter: 'https://twitter.com/msbd',
        },
      },
      message: 'Shop information retrieved successfully',
    };
    return NextResponse.json(shopData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch shop information' },
      { status: 500 }
    );
  }
}
