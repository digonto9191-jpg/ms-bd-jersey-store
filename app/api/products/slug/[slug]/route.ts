import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { parseJSON } from '@/lib/utils';

// GET /api/products/slug/:slug
export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: params.slug },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: { ...product, sizes: parseJSON(product.sizes), colors: parseJSON(product.colors) },
        message: 'Product fetched successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
