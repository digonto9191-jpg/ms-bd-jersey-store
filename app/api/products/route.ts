import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { parseJSON } from '@/lib/utils';

// GET /api/products
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const team = searchParams.get('team');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const featured = searchParams.get('featured');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sort = searchParams.get('sort') || 'newest'; // newest, lowest, highest

    const skip = (page - 1) * limit;

    let where: any = {};

    if (category) where.category = category;
    if (team) where.teamSlug = team;
    if (featured === 'true') where.featured = true;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'lowest') orderBy = { price: 'asc' };
    if (sort === 'highest') orderBy = { price: 'desc' };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      prisma.product.count({ where }),
    ]);

    const productsWithParsedData = products.map((p) => ({
      ...p,
      sizes: parseJSON(p.sizes),
      colors: parseJSON(p.colors),
    }));

    return NextResponse.json(
      {
        success: true,
        data: productsWithParsedData,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
        message: 'Products fetched successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST /api/products
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, team, teamSlug, category, season, description, price, stock, image, sizes, colors, featured } = body;

    if (!name || !slug || !team || !category || !price) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        team,
        teamSlug: teamSlug || slug,
        category,
        season: season || '2024/25',
        description: description || '',
        price: parseFloat(price.toString()),
        stock: parseInt(stock?.toString() || '0'),
        image: image || '',
        sizes: JSON.stringify(sizes || ['S', 'M', 'L', 'XL']),
        colors: JSON.stringify(colors || ['Home']),
        featured: featured || false,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: { ...product, sizes: parseJSON(product.sizes), colors: parseJSON(product.colors) },
        message: 'Product created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
