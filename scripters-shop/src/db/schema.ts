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
