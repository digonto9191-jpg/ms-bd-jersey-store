import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { parseJSON } from '@/lib/utils';

// GET /api/all - Comprehensive endpoint with all website data A to Z
export async function GET(request: NextRequest) {
  try {
    const [shop, products, teams, orders, contacts] = await Promise.all([
      // Shop information
      Promise.resolve({
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
      }),

      // All products
      prisma.product.findMany(),

      // All teams
      prisma.team.findMany(),

      // All orders with items
      prisma.order.findMany({
        include: { orderItems: true },
      }),

      // All contact messages
      prisma.contactMessage.findMany(),
    ]);

    // Parse product sizes and colors
    const parsedProducts = products.map((p) => ({
      ...p,
      sizes: parseJSON(p.sizes),
      colors: parseJSON(p.colors),
    }));

    // Group data by category
    const clubTeams = teams.filter((t) => t.category === 'club');
    const nationalTeams = teams.filter((t) => t.category === 'national');
    const clubProducts = parsedProducts.filter((p) => p.category === 'club');
    const nationalProducts = parsedProducts.filter((p) => p.category === 'national');

    // Statistics
    const stats = {
      totalProducts: parsedProducts.length,
      totalTeams: teams.length,
      clubTeamsCount: clubTeams.length,
      nationalTeamsCount: nationalTeams.length,
      totalOrders: orders.length,
      pendingOrders: orders.filter((o) => o.status === 'pending').length,
      completedOrders: orders.filter((o) => o.status === 'delivered').length,
      totalContacts: contacts.length,
      newContacts: contacts.filter((c) => c.status === 'new').length,
    };

    // Calculate total revenue
    const totalRevenue = orders
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.totalAmount, 0);

    const comprehensiveData = {
      success: true,
      data: {
        shop,
        products: {
          all: parsedProducts,
          clubs: clubProducts,
          national: nationalProducts,
          featured: parsedProducts.filter((p) => p.featured),
        },
        teams: {
          all: teams,
          clubs: clubTeams,
          national: nationalTeams,
        },
        orders: {
          all: orders,
          byStatus: {
            pending: orders.filter((o) => o.status === 'pending'),
            confirmed: orders.filter((o) => o.status === 'confirmed'),
            processing: orders.filter((o) => o.status === 'processing'),
            shipped: orders.filter((o) => o.status === 'shipped'),
            delivered: orders.filter((o) => o.status === 'delivered'),
            cancelled: orders.filter((o) => o.status === 'cancelled'),
          },
        },
        contacts: {
          all: contacts,
          byStatus: {
            new: contacts.filter((c) => c.status === 'new'),
            read: contacts.filter((c) => c.status === 'read'),
            replied: contacts.filter((c) => c.status === 'replied'),
          },
        },
        statistics: stats,
        financials: {
          totalRevenue,
          averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0,
        },
      },
      message: 'Complete website data retrieved successfully',
    };

    return NextResponse.json(comprehensiveData, { status: 200 });
  } catch (error) {
    console.error('Error fetching all data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch complete data' },
      { status: 500 }
    );
  }
}
