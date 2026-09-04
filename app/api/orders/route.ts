import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { parseJSON } from '@/lib/utils';

// GET /api/orders
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const email = searchParams.get('email');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const skip = (page - 1) * limit;

    let where: any = {};
    if (status) where.status = status;
    if (email) where.email = email;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        include: { orderItems: true },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.order.count({ where }),
    ]);

    return NextResponse.json(
      {
        success: true,
        data: orders,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
        message: 'Orders fetched successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

// POST /api/orders
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerName, phone, email, address, city, postalCode, paymentMethod, items, totalAmount } = body;

    if (!customerName || !phone || !email || !address || !city || !items || !totalAmount) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        customerName,
        phone,
        email,
        address,
        city,
        postalCode: postalCode || '',
        paymentMethod: paymentMethod || 'cash',
        status: 'pending',
        totalAmount: parseFloat(totalAmount.toString()),
        orderItems: {
          create: items.map((item: any) => ({
            productId: item.productId,
            productName: item.productName,
            size: item.size,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.subtotal,
          })),
        },
      },
      include: { orderItems: true },
    });

    return NextResponse.json(
      {
        success: true,
        data: order,
        message: 'Order created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
