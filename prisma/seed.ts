import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.team.deleteMany();
  await prisma.contactMessage.deleteMany();

  // Create teams
  const teams = await Promise.all([
    // Club teams
    prisma.team.create({
      data: {
        name: 'Real Madrid',
        slug: 'real-madrid',
        category: 'club',
        country: 'Spain',
        description: 'Royal Club of Spanish football',
        logo: 'https://via.placeholder.com/100?text=Real+Madrid',
      },
    }),
    prisma.team.create({
      data: {
        name: 'Barcelona',
        slug: 'barcelona',
        category: 'club',
        country: 'Spain',
        description: 'Football Club de Barcelona',
        logo: 'https://via.placeholder.com/100?text=Barcelona',
      },
    }),
    prisma.team.create({
      data: {
        name: 'Manchester United',
        slug: 'manchester-united',
        category: 'club',
        country: 'England',
        description: 'The Red Devils',
        logo: 'https://via.placeholder.com/100?text=Man+United',
      },
    }),
    prisma.team.create({
      data: {
        name: 'Manchester City',
        slug: 'manchester-city',
        category: 'club',
        country: 'England',
        description: 'The Sky Blues',
        logo: 'https://via.placeholder.com/100?text=Man+City',
      },
    }),
    prisma.team.create({
      data: {
        name: 'Liverpool',
        slug: 'liverpool',
        category: 'club',
        country: 'England',
        description: 'The Reds',
        logo: 'https://via.placeholder.com/100?text=Liverpool',
      },
    }),
    prisma.team.create({
      data: {
        name: 'Arsenal',
        slug: 'arsenal',
        category: 'club',
        country: 'England',
        description: 'The Gunners',
        logo: 'https://via.placeholder.com/100?text=Arsenal',
      },
    }),
    prisma.team.create({
      data: {
        name: 'Chelsea',
        slug: 'chelsea',
        category: 'club',
        country: 'England',
        description: 'The Blues',
        logo: 'https://via.placeholder.com/100?text=Chelsea',
      },
    }),
    prisma.team.create({
      data: {
        name: 'Bayern Munich',
        slug: 'bayern-munich',
        category: 'club',
        country: 'Germany',
        description: 'The Bavarians',
        logo: 'https://via.placeholder.com/100?text=Bayern',
      },
    }),
    prisma.team.create({
      data: {
        name: 'PSG',
        slug: 'psg',
        category: 'club',
        country: 'France',
        description: 'Paris Saint-Germain',
        logo: 'https://via.placeholder.com/100?text=PSG',
      },
    }),
    prisma.team.create({
      data: {
        name: 'Inter Milan',
        slug: 'inter-milan',
        category: 'club',
        country: 'Italy',
        description: 'Internazionale Milano',
        logo: 'https://via.placeholder.com/100?text=Inter',
      },
    }),
    prisma.team.create({
      data: {
        name: 'AC Milan',
        slug: 'ac-milan',
        category: 'club',
        country: 'Italy',
        description: 'Associazione Calcio Milan',
        logo: 'https://via.placeholder.com/100?text=AC+Milan',
      },
    }),
    prisma.team.create({
      data: {
        name: 'Juventus',
        slug: 'juventus',
        category: 'club',
        country: 'Italy',
        description: 'The Old Lady',
        logo: 'https://via.placeholder.com/100?text=Juventus',
      },
    }),
    prisma.team.create({
      data: {
        name: 'Borussia Dortmund',
        slug: 'borussia-dortmund',
        category: 'club',
        country: 'Germany',
        description: 'The Black and Yellows',
        logo: 'https://via.placeholder.com/100?text=Dortmund',
      },
    }),
    // National teams
    prisma.team.create({
      data: {
        name: 'Brazil',
        slug: 'brazil',
        category: 'national',
        country: 'Brazil',
        description: 'Five-time World Champions',
        logo: 'https://via.placeholder.com/100?text=Brazil',
      },
    }),
    prisma.team.create({
      data: {
        name: 'Argentina',
        slug: 'argentina',
        category: 'national',
        country: 'Argentina',
        description: 'World Champions 2022',
        logo: 'https://via.placeholder.com/100?text=Argentina',
      },
    }),
    prisma.team.create({
      data: {
        name: 'France',
        slug: 'france',
        category: 'national',
        country: 'France',
        description: 'World Champions 2018',
        logo: 'https://via.placeholder.com/100?text=France',
      },
    }),
    prisma.team.create({
      data: {
        name: 'Germany',
        slug: 'germany',
        category: 'national',
        country: 'Germany',
        description: 'World Champions 2014',
        logo: 'https://via.placeholder.com/100?text=Germany',
      },
    }),
    prisma.team.create({
      data: {
        name: 'England',
        slug: 'england',
        category: 'national',
        country: 'England',
        description: 'The Three Lions',
        logo: 'https://via.placeholder.com/100?text=England',
      },
    }),
    prisma.team.create({
      data: {
        name: 'Spain',
        slug: 'spain',
        category: 'national',
        country: 'Spain',
        description: 'Euro Champions 2012',
        logo: 'https://via.placeholder.com/100?text=Spain',
      },
    }),
    prisma.team.create({
      data: {
        name: 'Portugal',
        slug: 'portugal',
        category: 'national',
        country: 'Portugal',
        description: 'Euro Champions 2016',
        logo: 'https://via.placeholder.com/100?text=Portugal',
      },
    }),
    prisma.team.create({
      data: {
        name: 'Netherlands',
        slug: 'netherlands',
        category: 'national',
        country: 'Netherlands',
        description: 'Total Football Masters',
        logo: 'https://via.placeholder.com/100?text=Netherlands',
      },
    }),
    prisma.team.create({
      data: {
        name: 'Belgium',
        slug: 'belgium',
        category: 'national',
        country: 'Belgium',
        description: 'Golden Generation',
        logo: 'https://via.placeholder.com/100?text=Belgium',
      },
    }),
    prisma.team.create({
      data: {
        name: 'Japan',
        slug: 'japan',
        category: 'national',
        country: 'Japan',
        description: 'Rising Sun Warriors',
        logo: 'https://via.placeholder.com/100?text=Japan',
      },
    }),
    prisma.team.create({
      data: {
        name: 'Bangladesh',
        slug: 'bangladesh',
        category: 'national',
        country: 'Bangladesh',
        description: 'Bengal Tigers',
        logo: 'https://via.placeholder.com/100?text=Bangladesh',
      },
    }),
  ]);

  console.log(`✅ Created ${teams.length} teams`);

  // Create products
  const products = [
    // Real Madrid
    { name: 'Real Madrid Home Jersey 2024', teamSlug: 'real-madrid', season: '2024/25', price: 2500, stock: 15, featured: true },
    { name: 'Real Madrid Away Jersey 2024', teamSlug: 'real-madrid', season: '2024/25', price: 2500, stock: 12, featured: true },
    { name: 'Real Madrid Third Jersey 2024', teamSlug: 'real-madrid', season: '2024/25', price: 2400, stock: 8 },
    // Barcelona
    { name: 'Barcelona Home Jersey 2024', teamSlug: 'barcelona', season: '2024/25', price: 2500, stock: 18, featured: true },
    { name: 'Barcelona Away Jersey 2024', teamSlug: 'barcelona', season: '2024/25', price: 2500, stock: 14 },
    { name: 'Barcelona Third Jersey 2024', teamSlug: 'barcelona', season: '2024/25', price: 2400, stock: 10 },
    // Manchester United
    { name: 'Manchester United Home Jersey 2024', teamSlug: 'manchester-united', season: '2024/25', price: 2400, stock: 20, featured: true },
    { name: 'Manchester United Away Jersey 2024', teamSlug: 'manchester-united', season: '2024/25', price: 2400, stock: 16 },
    // Manchester City
    { name: 'Manchester City Home Jersey 2024', teamSlug: 'manchester-city', season: '2024/25', price: 2400, stock: 17, featured: true },
    { name: 'Manchester City Away Jersey 2024', teamSlug: 'manchester-city', season: '2024/25', price: 2400, stock: 13 },
    // Liverpool
    { name: 'Liverpool Home Jersey 2024', teamSlug: 'liverpool', season: '2024/25', price: 2300, stock: 19, featured: true },
    { name: 'Liverpool Away Jersey 2024', teamSlug: 'liverpool', season: '2024/25', price: 2300, stock: 15 },
    // Arsenal
    { name: 'Arsenal Home Jersey 2024', teamSlug: 'arsenal', season: '2024/25', price: 2300, stock: 16, featured: false },
    { name: 'Arsenal Away Jersey 2024', teamSlug: 'arsenal', season: '2024/25', price: 2300, stock: 12 },
    // Chelsea
    { name: 'Chelsea Home Jersey 2024', teamSlug: 'chelsea', season: '2024/25', price: 2300, stock: 14 },
    { name: 'Chelsea Away Jersey 2024', teamSlug: 'chelsea', season: '2024/25', price: 2300, stock: 11 },
    // Bayern Munich
    { name: 'Bayern Munich Home Jersey 2024', teamSlug: 'bayern-munich', season: '2024/25', price: 2500, stock: 13, featured: false },
    { name: 'Bayern Munich Away Jersey 2024', teamSlug: 'bayern-munich', season: '2024/25', price: 2500, stock: 10 },
    // PSG
    { name: 'PSG Home Jersey 2024', teamSlug: 'psg', season: '2024/25', price: 2600, stock: 12 },
    { name: 'PSG Away Jersey 2024', teamSlug: 'psg', season: '2024/25', price: 2600, stock: 9 },
    // Inter Milan
    { name: 'Inter Milan Home Jersey 2024', teamSlug: 'inter-milan', season: '2024/25', price: 2200, stock: 11 },
    { name: 'Inter Milan Away Jersey 2024', teamSlug: 'inter-milan', season: '2024/25', price: 2200, stock: 8 },
    // AC Milan
    { name: 'AC Milan Home Jersey 2024', teamSlug: 'ac-milan', season: '2024/25', price: 2200, stock: 14 },
    // Juventus
    { name: 'Juventus Home Jersey 2024', teamSlug: 'juventus', season: '2024/25', price: 2400, stock: 16 },
    // Borussia Dortmund
    { name: 'Borussia Dortmund Home Jersey 2024', teamSlug: 'borussia-dortmund', season: '2024/25', price: 2200, stock: 10 },
    // National Teams
    { name: 'Brazil Home Jersey', teamSlug: 'brazil', season: '2024', price: 1800, stock: 25, featured: true },
    { name: 'Brazil Away Jersey', teamSlug: 'brazil', season: '2024', price: 1800, stock: 20 },
    { name: 'Argentina Home Jersey', teamSlug: 'argentina', season: '2024', price: 2000, stock: 22, featured: true },
    { name: 'Argentina Away Jersey', teamSlug: 'argentina', season: '2024', price: 2000, stock: 18 },
    { name: 'France Home Jersey', teamSlug: 'france', season: '2024', price: 1900, stock: 16 },
    { name: 'Germany Home Jersey', teamSlug: 'germany', season: '2024', price: 1900, stock: 14 },
    { name: 'England Home Jersey', teamSlug: 'england', season: '2024', price: 1800, stock: 20 },
    { name: 'Spain Home Jersey', teamSlug: 'spain', season: '2024', price: 1800, stock: 15 },
    { name: 'Portugal Home Jersey', teamSlug: 'portugal', season: '2024', price: 1750, stock: 12 },
    { name: 'Netherlands Home Jersey', teamSlug: 'netherlands', season: '2024', price: 1750, stock: 13 },
    { name: 'Belgium Home Jersey', teamSlug: 'belgium', season: '2024', price: 1700, stock: 10 },
    { name: 'Japan Home Jersey', teamSlug: 'japan', season: '2024', price: 1600, stock: 12 },
    { name: 'Bangladesh Home Jersey', teamSlug: 'bangladesh', season: '2024', price: 1200, stock: 30, featured: true },
  ];

  const createdProducts = await Promise.all(
    products.map((prod) =>
      prisma.product.create({
        data: {
          name: prod.name,
          slug: prod.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
          team: prod.teamSlug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          teamSlug: prod.teamSlug,
          category: prod.teamSlug === 'bangladesh' || ['brazil', 'argentina', 'france', 'germany', 'england', 'spain', 'portugal', 'netherlands', 'belgium', 'japan'].includes(prod.teamSlug) ? 'national' : 'club',
          season: prod.season,
          description: `Premium quality ${prod.name} jersey for true fans.`,
          price: prod.price,
          stock: prod.stock,
          image: `https://via.placeholder.com/400x500?text=${encodeURIComponent(prod.name)}`,
          sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
          colors: JSON.stringify(['Home', 'Away', 'Third']),
          featured: prod.featured || false,
        },
      })
    )
  );

  console.log(`✅ Created ${createdProducts.length} products`);

  console.log('\n✨ Database seeded successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
