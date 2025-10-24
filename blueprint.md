# Blueprint: Scripters eCommerce Platform

**Version:** 1.0.0
**Last Updated:** 2025-10-24
**Platform:** Next.js 15 + Bun + Neon Postgres + Vercel

---

## Schema Metadata

```yaml
schema_version: "1.0.0"
platform_type: "single_vendor_ecommerce"
primary_runtime: "bun"
framework: "nextjs@15"
database: "neon_serverless_postgres"
deployment: "vercel"
authentication: "wallet_based"
payment_method: "crypto_wallet"
product_type: "digital_goods"
```

---

## Core Architecture

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Runtime** | Bun 1.1+ | Fast JavaScript runtime with native TypeScript support |
| **Framework** | Next.js 15 | React framework with App Router and Server Components |
| **Database** | Neon Serverless Postgres | Scalable, serverless PostgreSQL with branching |
| **ORM** | Drizzle ORM | Type-safe database queries and migrations |
| **Auth** | RainbowKit + wagmi | Wallet-based authentication |
| **Payments** | Web3 Wallets | Direct crypto payments |
| **Deployment** | Vercel | Edge deployment with automatic scaling |
| **Styling** | Tailwind CSS | Utility-first CSS framework |

---

## Custom Data Types

### Wallet Configuration

```typescript
interface WalletConfig {
  id: string;                    // Unique wallet identifier
  name: string;                  // Display name
  connector: WalletConnector;    // RainbowKit connector
  icon: string;                  // Wallet icon URL
  enabled: boolean;              // Active status
  priority: number;              // Display order
}

// Values: rainbowWallet, walletConnectWallet, metamaskWallet, coinbaseWallet
// Progressions: Configure → Test → Enable → Production
// MD-representations:
//   - `[configured]`: Wallet configured
//   - `[active]`: Wallet enabled in production
```

### Runtime Environment

```typescript
interface RuntimeConfig {
  environment: 'development' | 'staging' | 'production';
  runtime: 'bun' | 'node';
  framework: 'nextjs';
  database_url: string;
  features: string[];
}

// Values: development, staging, production
// Progressions: Setup → Configure → Test → Deploy
// MD-representations:
//   - `[dev]`: Development environment
//   - `[staging]`: Staging environment
//   - `[prod]`: Production environment
```

### Database Branch

```typescript
interface DatabaseBranch {
  id: string;                    // Neon branch ID
  name: string;                  // Branch name
  parent: string;                // Parent branch
  created_at: Date;
  endpoint: string;              // Database connection URL
  purpose: 'development' | 'preview' | 'production';
}

// Values: main, dev, preview-[pr-number]
// Progressions: Create → Migrate → Test → Merge
// MD-representations:
//   - `[main]`: Production database
//   - `[dev]`: Development branch
//   - `[preview]`: PR preview branch
```

### Product Schema

```typescript
interface DigitalProduct {
  id: string;
  name: string;
  description: string;
  price_usd: number;
  price_crypto: {
    eth?: number;
    usdc?: number;
  };
  category: string;
  file_url: string;              // Secure download URL
  file_type: string;             // Script, template, asset, etc.
  license: 'single' | 'unlimited' | 'commercial';
  status: 'draft' | 'active' | 'archived';
  created_at: Date;
  updated_at: Date;
}

// Values: draft, active, archived
// Progressions: Create → Review → Publish → Archive
// MD-representations:
//   - `[draft]`: Product in draft
//   - `[active]`: Live product
//   - `[archived]`: Archived product
```

### Admin Role

```typescript
interface AdminUser {
  wallet_address: string;        // Ethereum address (primary key)
  role: 'super_admin' | 'admin' | 'moderator';
  permissions: string[];
  created_at: Date;
  last_login: Date;
}

// Values: super_admin, admin, moderator
// Progressions: Invite → Verify → Activate
// MD-representations:
//   - `[super_admin]`: Full platform control
//   - `[admin]`: Product management
//   - `[moderator]`: Content moderation
```

---

## Development Phases

### Phase 1: Foundation Setup

**Duration:** Week 1
**Owner:** DevOps Team

#### Tasks

- **[1.1] Initialize Next.js 15 Project with Bun**
  - Runtime: `bun`
  - Dependencies: None
  - Status: `[ ]` Not Started
  - Commands:
    ```bash
    bun create next-app@latest scripters-shop --typescript --tailwind --app
    cd scripters-shop
    ```

- **[1.2] Configure Neon Serverless Postgres**
  - Runtime: `cloud`
  - Dependencies: `[1.1]`
  - Status: `[ ]` Not Started
  - Steps:
    1. Create Neon project at console.neon.tech
    2. Enable database branching
    3. Configure autoscaling (0.25 - 2 CU)
    4. Set scale-to-zero (5 minutes idle)
    5. Get connection string

- **[1.3] Install Drizzle ORM**
  - Runtime: `bun`
  - Dependencies: `[1.2]`
  - Status: `[ ]` Not Started
  - Commands:
    ```bash
    bun add drizzle-orm @neondatabase/serverless
    bun add -d drizzle-kit
    ```

- **[1.4] Setup Environment Variables**
  - Runtime: `local`
  - Dependencies: `[1.2]`
  - Status: `[ ]` Not Started
  - Files:
    ```env
    # .env.local
    DATABASE_URL="postgresql://..."
    NEXT_PUBLIC_CHAIN_ID="1"
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=""
    ```

**Deliverables:**
- ✅ Working Next.js app with Bun
- ✅ Neon database connected
- ✅ Drizzle ORM configured
- ✅ Environment setup complete

---

### Phase 2: Database Schema & Migrations

**Duration:** Week 1-2
**Owner:** Backend Team

#### Tasks

- **[2.1] Define Core Database Schema**
  - Runtime: `bun`
  - Dependencies: `[1.3]`
  - Status: `[ ]` Not Started
  - Schema: `src/db/schema.ts`

- **[2.2] Create Initial Migration**
  - Runtime: `bun`
  - Dependencies: `[2.1]`
  - Status: `[ ]` Not Started
  - Commands:
    ```bash
    bun run drizzle-kit generate:pg
    bun run drizzle-kit push:pg
    ```

- **[2.3] Setup Database Branching Workflow**
  - Runtime: `cloud`
  - Dependencies: `[2.2]`
  - Status: `[ ]` Not Started
  - Strategy:
    - `main` branch → Production
    - `dev` branch → Development
    - `preview-*` → PR previews

**Deliverables:**
- ✅ Complete database schema
- ✅ Migration files
- ✅ Branching strategy active

---

### Phase 3: Wallet Authentication

**Duration:** Week 2
**Owner:** Frontend Team

#### Tasks

- **[3.1] Install RainbowKit & wagmi**
  - Runtime: `bun`
  - Dependencies: `[1.1]`
  - Status: `[ ]` Not Started
  - Commands:
    ```bash
    bun add @rainbow-me/rainbowkit wagmi viem@2.x
    ```

- **[3.2] Configure Wallet Connectors**
  - Runtime: `nextjs`
  - Dependencies: `[3.1]`
  - Status: `[ ]` Not Started
  - Supported Wallets:
    - `[configured]` MetaMask
    - `[configured]` WalletConnect
    - `[configured]` Coinbase Wallet
    - `[configured]` Rainbow Wallet

- **[3.3] Implement Authentication Flow**
  - Runtime: `nextjs`
  - Dependencies: `[3.2]`
  - Status: `[ ]` Not Started
  - Flow:
    1. User connects wallet
    2. Sign message for verification
    3. Create/retrieve user session
    4. Store in database

- **[3.4] Create Admin Access Control**
  - Runtime: `nextjs`
  - Dependencies: `[3.3]`, `[2.2]`
  - Status: `[ ]` Not Started
  - Features:
    - Whitelist admin wallets
    - Role-based permissions
    - Admin dashboard route protection

**Deliverables:**
- ✅ Wallet connection UI
- ✅ Authentication working
- ✅ Admin access control

---

### Phase 4: Product Management System

**Duration:** Week 3
**Owner:** Backend + Frontend Teams

#### Tasks

- **[4.1] Create Product CRUD API**
  - Runtime: `nextjs`
  - Dependencies: `[2.2]`
  - Status: `[ ]` Not Started
  - Endpoints:
    - `POST /api/admin/products` - Create product
    - `GET /api/products` - List products
    - `PUT /api/admin/products/[id]` - Update product
    - `DELETE /api/admin/products/[id]` - Delete product

- **[4.2] Build Admin Product Dashboard**
  - Runtime: `nextjs`
  - Dependencies: `[3.4]`, `[4.1]`
  - Status: `[ ]` Not Started
  - Features:
    - Product list view
    - Create/edit forms
    - File upload interface
    - Status management

- **[4.3] Implement File Storage**
  - Runtime: `cloud`
  - Dependencies: `[4.1]`
  - Status: `[ ]` Not Started
  - Strategy:
    - Use Vercel Blob Storage
    - Signed URLs for downloads
    - Access control via database

**Deliverables:**
- ✅ Product management API
- ✅ Admin dashboard
- ✅ Secure file storage

---

### Phase 5: Customer Shopping Experience

**Duration:** Week 4
**Owner:** Frontend Team

#### Tasks

- **[5.1] Build Product Catalog Page**
  - Runtime: `nextjs`
  - Dependencies: `[4.1]`
  - Status: `[ ]` Not Started
  - Features:
    - Grid/list views
    - Category filtering
    - Search functionality
    - Product cards

- **[5.2] Create Product Detail Pages**
  - Runtime: `nextjs`
  - Dependencies: `[5.1]`
  - Status: `[ ]` Not Started
  - Features:
    - Full description
    - Preview/screenshots
    - Price in USD + crypto
    - Purchase button

- **[5.3] Implement Shopping Cart**
  - Runtime: `nextjs`
  - Dependencies: `[5.2]`
  - Status: `[ ]` Not Started
  - Features:
    - Add/remove items
    - Quantity management
    - Price calculation
    - Persist in session

**Deliverables:**
- ✅ Product catalog
- ✅ Product pages
- ✅ Shopping cart

---

### Phase 6: Payment & Order Processing

**Duration:** Week 5
**Owner:** Backend Team

#### Tasks

- **[6.1] Implement Crypto Payment Flow**
  - Runtime: `nextjs`
  - Dependencies: `[3.3]`, `[5.3]`
  - Status: `[ ]` Not Started
  - Flow:
    1. Calculate total in crypto
    2. Generate payment request
    3. User approves transaction
    4. Verify on-chain
    5. Create order record

- **[6.2] Create Order Management System**
  - Runtime: `nextjs`
  - Dependencies: `[6.1]`
  - Status: `[ ]` Not Started
  - Features:
    - Order history (customer)
    - Order management (admin)
    - Transaction verification
    - Refund handling

- **[6.3] Build Download System**
  - Runtime: `nextjs`
  - Dependencies: `[6.2]`
  - Status: `[ ]` Not Started
  - Features:
    - Verify order ownership
    - Generate time-limited download links
    - Track download attempts
    - License key generation

**Deliverables:**
- ✅ Payment processing
- ✅ Order system
- ✅ Secure downloads

---

### Phase 7: Admin Analytics & Tools

**Duration:** Week 6
**Owner:** Full Stack Team

#### Tasks

- **[7.1] Build Analytics Dashboard**
  - Runtime: `nextjs`
  - Dependencies: `[6.2]`
  - Status: `[ ]` Not Started
  - Metrics:
    - Total revenue
    - Product performance
    - Customer activity
    - Conversion rates

- **[7.2] Implement Customer Management**
  - Runtime: `nextjs`
  - Dependencies: `[3.3]`
  - Status: `[ ]` Not Started
  - Features:
    - Customer list
    - Purchase history
    - Support notes
    - Wallet verification

- **[7.3] Create Email Notification System**
  - Runtime: `cloud`
  - Dependencies: `[6.2]`
  - Status: `[ ]` Not Started
  - Triggers:
    - Order confirmation
    - Download links
    - Admin alerts

**Deliverables:**
- ✅ Analytics dashboard
- ✅ Customer management
- ✅ Email system

---

### Phase 8: Testing & Optimization

**Duration:** Week 7
**Owner:** QA + DevOps Teams

#### Tasks

- **[8.1] Integration Testing**
  - Runtime: `bun`
  - Dependencies: All previous phases
  - Status: `[ ]` Not Started
  - Coverage:
    - Wallet connection flows
    - Payment processing
    - File downloads
    - Admin operations

- **[8.2] Performance Optimization**
  - Runtime: `nextjs`
  - Dependencies: `[8.1]`
  - Status: `[ ]` Not Started
  - Focus:
    - Database query optimization
    - Image optimization
    - Code splitting
    - Edge caching

- **[8.3] Security Audit**
  - Runtime: `manual`
  - Dependencies: `[8.2]`
  - Status: `[ ]` Not Started
  - Checks:
    - Wallet signature verification
    - API route protection
    - File access control
    - SQL injection prevention

**Deliverables:**
- ✅ Test coverage
- ✅ Performance benchmarks
- ✅ Security report

---

### Phase 9: Deployment & Monitoring

**Duration:** Week 8
**Owner:** DevOps Team

#### Tasks

- **[9.1] Configure Vercel Deployment**
  - Runtime: `cloud`
  - Dependencies: `[8.3]`
  - Status: `[ ]` Not Started
  - Setup:
    - Link Neon database
    - Configure environment variables
    - Enable preview deployments
    - Setup custom domain

- **[9.2] Implement Monitoring**
  - Runtime: `cloud`
  - Dependencies: `[9.1]`
  - Status: `[ ]` Not Started
  - Tools:
    - Vercel Analytics
    - Neon database metrics
    - Error tracking (Sentry)
    - Uptime monitoring

- **[9.3] Launch Production**
  - Runtime: `cloud`
  - Dependencies: `[9.2]`
  - Status: `[ ]` Not Started
  - Checklist:
    - [ ] Domain configured
    - [ ] SSL enabled
    - [ ] Database backed up
    - [ ] Admin access verified
    - [ ] Payment testing complete

**Deliverables:**
- ✅ Production deployment
- ✅ Monitoring active
- ✅ Platform live

---

## Database Schema Definition

```typescript
// src/db/schema.ts
import { pgTable, text, timestamp, decimal, boolean, integer, json } from 'drizzle-orm/pg-core';

// Admin Users
export const adminUsers = pgTable('admin_users', {
  walletAddress: text('wallet_address').primaryKey(),
  role: text('role').notNull(), // super_admin, admin, moderator
  permissions: json('permissions').$type<string[]>(),
  createdAt: timestamp('created_at').defaultNow(),
  lastLogin: timestamp('last_login'),
});

// Products
export const products = pgTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  priceUsd: decimal('price_usd', { precision: 10, scale: 2 }),
  priceEth: decimal('price_eth', { precision: 18, scale: 8 }),
  priceUsdc: decimal('price_usdc', { precision: 10, scale: 2 }),
  category: text('category'),
  fileUrl: text('file_url'),
  fileType: text('file_type'),
  license: text('license'), // single, unlimited, commercial
  status: text('status').default('draft'), // draft, active, archived
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Customers
export const customers = pgTable('customers', {
  walletAddress: text('wallet_address').primaryKey(),
  email: text('email'),
  createdAt: timestamp('created_at').defaultNow(),
  lastPurchase: timestamp('last_purchase'),
});

// Orders
export const orders = pgTable('orders', {
  id: text('id').primaryKey(),
  customerWallet: text('customer_wallet').notNull(),
  totalUsd: decimal('total_usd', { precision: 10, scale: 2 }),
  totalCrypto: decimal('total_crypto', { precision: 18, scale: 8 }),
  currency: text('currency'), // ETH, USDC, etc.
  txHash: text('tx_hash'),
  status: text('status'), // pending, confirmed, completed, refunded
  items: json('items').$type<OrderItem[]>(),
  createdAt: timestamp('created_at').defaultNow(),
});

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

// Downloads
export const downloads = pgTable('downloads', {
  id: text('id').primaryKey(),
  orderId: text('order_id').notNull(),
  productId: text('product_id').notNull(),
  customerWallet: text('customer_wallet').notNull(),
  downloadUrl: text('download_url'),
  expiresAt: timestamp('expires_at'),
  downloadCount: integer('download_count').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});
```

---

## Reserved Terms & Conventions

### Task Status Values
- `[ ]` Not Started
- `[>]` In Progress
- `[x]` Completed
- `[-]` Blocked
- `[!]` Needs Review

### Environment Values
- `[dev]` Development
- `[staging]` Staging
- `[prod]` Production

### Priority Values
- `[P0]` Critical
- `[P1]` High
- `[P2]` Medium
- `[P3]` Low

### Component Status
- `[configured]` Component configured
- `[active]` Component active in production
- `[deprecated]` Component deprecated

---

## Integration Requirements

### Neon Database Features
- ✅ **Database Branching:** Create branch per PR for isolated testing
- ✅ **Autoscaling:** Scale from 0.25 to 2 CU based on load
- ✅ **Scale-to-Zero:** Reduce costs during idle periods
- ✅ **Point-in-Time Recovery:** 7-day recovery window
- ✅ **Read Replicas:** Add for high-traffic product pages
- ✅ **Drizzle Studio:** Visual database management

### Vercel Integration
- ✅ **Automatic Deployments:** PR previews with database branches
- ✅ **Edge Functions:** Serverless API routes
- ✅ **Analytics:** Built-in performance monitoring
- ✅ **Environment Variables:** Secure credential management
- ✅ **Custom Domain:** scripters.shop configuration

### RainbowKit Configuration
```typescript
// src/app/providers.tsx
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;

const config = getDefaultConfig({
  appName: 'Scripters Shop',
  projectId,
  chains: [mainnet],
  ssr: true,
});
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Page Load Time** | < 2s | Vercel Analytics |
| **Database Response Time** | < 100ms | Neon Metrics |
| **Wallet Connection Success** | > 95% | Error logs |
| **Payment Success Rate** | > 99% | Order completion |
| **Uptime** | > 99.9% | Status monitoring |
| **Scale-to-Zero Activation** | < 1s | Neon cold start |

---

## Maintenance & Extensibility

### Future Enhancements (Post-Launch)
- [ ] Multi-vendor support
- [ ] Subscription products
- [ ] Bundle pricing
- [ ] Affiliate system
- [ ] Review system
- [ ] Wishlist functionality
- [ ] Email marketing integration

### Backup Strategy
- **Database:** Neon automated backups (7 days)
- **Files:** Vercel Blob automatic replication
- **Code:** GitHub version control

### Monitoring Alerts
- Database connection failures
- Payment processing errors
- File download failures
- High error rates (> 1%)
- Slow queries (> 500ms)

---

## Quick Reference Commands

```bash
# Development
bun dev                          # Start dev server
bun run db:generate              # Generate migrations
bun run db:push                  # Push schema to database
bun run db:studio                # Open Drizzle Studio

# Testing
bun test                         # Run tests
bun run test:e2e                 # End-to-end tests

# Deployment
vercel                           # Deploy to preview
vercel --prod                    # Deploy to production
vercel env pull                  # Sync environment variables

# Database
neon branches list               # List all branches
neon branches create             # Create new branch
neon branches delete             # Delete branch
```

---

## Support & Documentation

- **Platform Docs:** docs.scripters.shop
- **API Reference:** api.scripters.shop/docs
- **Neon Documentation:** neon.tech/docs
- **RainbowKit Docs:** rainbowkit.com/docs
- **Vercel Guides:** vercel.com/docs

---

**Blueprint Status:** `[active]`
**Next Review:** 2025-11-24
**Maintained By:** Engineering Team