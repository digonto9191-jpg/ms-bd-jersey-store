# MS BD - Football Jersey Store 🏟️

A modern, full-stack e-commerce platform for premium football jerseys built with Next.js, Prisma, and PostgreSQL.

**Live Features:**
- ✅ 40+ Premium Jerseys (Club & National Teams)
- ✅ Complete REST API (11 endpoints + comprehensive `/api/all`)
- ✅ Shopping Cart with localStorage
- ✅ Secure Checkout System
- ✅ Order Tracking
- ✅ Contact Management
- ✅ Admin APIs for order management
- ✅ Fully Responsive Design

---

## 🚀 Quick Start

### Prerequisites
```bash
Node.js 18+ 
PostgreSQL database
npm or yarn
```

### Installation

1. **Clone Repository**
```bash
git clone https://github.com/digonto9191-jpg/ms-bd-jersey-store.git
cd ms-bd-jersey-store
```

2. **Install Dependencies**
```bash
npm install
```

3. **Setup Environment Variables**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/msbd"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

4. **Setup Database**
```bash
# Generate Prisma client
npx prisma generate

# Create database tables
npx prisma migrate dev --name init

# Seed sample data (40 products + 24 teams)
npm run seed
```

5. **Run Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
ms-bd-jersey-store/
├── app/
│   ├── api/                    # API Routes
│   │   ├── route.ts           # API Documentation
│   │   ├── all/route.ts       # Comprehensive data endpoint
│   │   ├── shop/route.ts      # Shop info
│   │   ├── products/          # Product APIs
│   │   ├── teams/             # Team APIs
│   │   ├── orders/            # Order APIs
│   │   └── contact/           # Contact APIs
│   ├── context/               # React Context
│   │   └── CartContext.tsx    # Shopping cart state
│   ├── page.tsx               # Home page
│   ├── jerseys/
│   │   ├── page.tsx          # Products listing
│   │   └── [slug]/page.tsx   # Product details
│   ├── cart/page.tsx          # Shopping cart
│   ├── checkout/page.tsx      # Checkout page
│   ├── orders/[id]/page.tsx   # Order tracking
│   ├── about/page.tsx         # About page
│   ���── contact/page.tsx       # Contact form
│   └── layout.tsx             # Root layout
├── components/                # Reusable Components
│   ├── Navbar.tsx            # Navigation bar
│   ├── Footer.tsx            # Footer
│   └── ProductCard.tsx       # Product card
├── lib/
│   ├── prisma.ts             # Prisma client
│   └── utils.ts              # Utilities
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Seed data
├── public/                    # Static assets
├── styles/                    # Global styles
├── .env.local                # Environment variables
├── package.json              # Dependencies
├── tailwind.config.ts        # Tailwind config
└── tsconfig.json             # TypeScript config
```

---

## 🔌 API Endpoints

### Base URL: `http://localhost:3000/api`

### Documentation
**GET** `/api` - Full API documentation

### Shop
**GET** `/api/shop` - Get shop information

### Products
```
GET    /api/products                    - List products (with filtering)
GET    /api/products/:id                - Get product by ID
GET    /api/products/slug/:slug         - Get product by slug
POST   /api/products                    - Create product
PUT    /api/products/:id                - Update product (full)
PATCH  /api/products/:id                - Update product (partial)
DELETE /api/products/:id                - Delete product
```

**Query Parameters for GET /api/products:**
```
?category=club              # Filter by category (club/national)
?team=real-madrid           # Filter by team slug
?search=jersey              # Search by name
?minPrice=1000              # Minimum price
?maxPrice=3000              # Maximum price
?featured=true              # Featured only
?page=1                     # Page number (default: 1)
?limit=12                   # Items per page (default: 10)
?sort=newest                # Sort: newest|lowest|highest
```

### Teams
```
GET    /api/teams                      - List all teams
GET    /api/teams/:id                  - Get team by ID
GET    /api/teams/slug/:slug           - Get team by slug
GET    /api/teams/:slug/products       - Get team's products
```

### Orders
```
GET    /api/orders                     - List orders (with pagination)
GET    /api/orders/:id                 - Get order details
POST   /api/orders                     - Create order
PATCH  /api/orders/:id/status          - Update order status
```

**Order Status Flow:**
```
pending → confirmed → processing → shipped → delivered
                                           ↓
                                        cancelled
```

### Contact
```
GET    /api/contact                    - Get contact messages
POST   /api/contact                    - Submit contact form
```

### Comprehensive Data
**GET** `/api/all` - Get ALL website data (products, teams, orders, contacts, statistics)

---

## 🛍️ Features

### Frontend Pages

#### Home Page (`/`)
- Hero section with CTAs
- Featured products carousel
- Why MS BD section
- Popular teams showcase

#### Jerseys Page (`/jerseys`)
- Product grid with images
- Real-time filtering (category, team, price)
- Search functionality
- Sorting (newest, price)
- Pagination

#### Product Details (`/jerseys/:slug`)
- Large product image
- Size & color selection
- Quantity selector
- Stock information
- Related products
- Add to cart button

#### Shopping Cart (`/cart`)
- View all cart items
- Quantity adjuster
- Remove items
- Order summary
- Proceed to checkout

#### Checkout (`/checkout`)
- Delivery information form
- Payment method selection (Cash/bKash/Nagad)
- Order summary
- Place order

#### Order Tracking (`/orders/:id`)
- Visual delivery timeline
- Current order status
- Order details
- Order items
- Contact support option

#### About Page (`/about`)
- Company story
- Mission & values
- Statistics

#### Contact Page (`/contact`)
- Contact form
- Business hours
- Multiple contact methods
- Email & phone

---

## 📊 Database Schema

### Models

```prisma
model Product
  - id, name, slug, teamSlug
  - price, stock, image
  - sizes (JSON), colors (JSON)
  - category, featured, timestamps

model Team
  - id, name, slug, category
  - logo, founded, country
  - description, timestamps

model Order
  - id, customerName, email, phone
  - address, city, postalCode
  - status, paymentMethod
  - totalAmount, orderItems
  - timestamps

model OrderItem
  - id, orderId, productId
  - productName, size, quantity
  - price, subtotal

model ContactMessage
  - id, name, email
  - subject, message, status
  - timestamps
```

---

## 🛠️ Available Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run seed             # Seed sample data
npx prisma studio       # Open Prisma Studio (GUI)
npx prisma migrate dev   # Run migrations

# Linting
npm run lint             # Run ESLint
```

---

## 🎨 Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL with Prisma ORM
- **State Management:** React Context API
- **Storage:** localStorage (cart)

---

## 🔒 Security Features

✅ Environment variables for sensitive data
✅ CORS-ready API structure
✅ Input validation on forms
✅ SQL injection protection (Prisma)
✅ Type-safe with TypeScript

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

---

## 🚨 Troubleshooting

### Database Connection Error
```bash
# Check if PostgreSQL is running
# Update DATABASE_URL in .env.local
npx prisma db push
```

### Port Already in Use
```bash
# Run on different port
npm run dev -- -p 3001
```

### Prisma Client Error
```bash
# Regenerate Prisma client
npx prisma generate
```

---

## 📈 Performance Optimizations

- ✅ Image optimization with Next.js Image
- ✅ Code splitting and lazy loading
- ✅ Database query optimization
- ✅ Caching strategies
- ✅ Minified CSS with Tailwind

---

## 🌍 Deployment

### Vercel (Recommended)
```bash
1. Push to GitHub
2. Connect repo to Vercel
3. Set environment variables
4. Deploy automatically
```

### Docker
```bash
docker build -t msbd .
docker run -p 3000:3000 msbd
```

---

## 📞 Support

**Email:** hello@msbd.example
**Phone:** +8801000000000
**Address:** Dhaka, Bangladesh

---

## 📄 License

MIT License - Feel free to use this project!

---

## 🙏 Credits

Built with ❤️ for football fans by Digonto

---

## 🚀 Next Steps

- [ ] Add payment gateway integration (bKash, Nagad)
- [ ] Implement admin dashboard
- [ ] Add email notifications
- [ ] Setup SMS notifications
- [ ] Add wishlist feature
- [ ] Implement reviews & ratings
- [ ] Add inventory management
- [ ] Setup analytics

---

**Made with ❤️ for football fans. Your Jersey. Your Team. 🏟️**
