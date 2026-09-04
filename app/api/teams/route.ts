import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/teams
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category'); // 'club' or 'national'

    let where: any = {};
    if (category) where.category = category;

    const teams = await prisma.team.findMany({
      where,
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(
      {
        success: true,
        data: teams,
        message: 'Teams fetched successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch teams' },
      { status: 500 }
    );
  }
}
