import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { parseJSON } from '@/lib/utils';

// GET /api/teams/:slug/products
export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const products = await prisma.product.findMany({
      where: { teamSlug: params.slug },
    });

    const productsWithParsedData = products.map((p) => ({
      ...p,
      sizes: parseJSON(p.sizes),
      colors: parseJSON(p.colors),
    }));

    return NextResponse.json(
      {
        success: true,
        data: productsWithParsedData,
        message: 'Team products fetched successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch team products' },
      { status: 500 }
    );
  }
}
