import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { parseJSON } from '@/lib/utils';

// GET /api/products/:id
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const product = await prisma.product.findUnique({
      where: { id },
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

// PUT /api/products/:id
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();

    const product = await prisma.product.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(
      {
        success: true,
        data: { ...product, sizes: parseJSON(product.sizes), colors: parseJSON(product.colors) },
        message: 'Product updated successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// PATCH /api/products/:id
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();

    const product = await prisma.product.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(
      {
        success: true,
        data: { ...product, sizes: parseJSON(product.sizes), colors: parseJSON(product.colors) },
        message: 'Product patched successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to patch product' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/:id
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        success: true,
        data: null,
        message: 'Product deleted successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
