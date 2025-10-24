CREATE TABLE IF NOT EXISTS "admin_users" (
	"wallet_address" text PRIMARY KEY NOT NULL,
	"role" text NOT NULL,
	"permissions" json,
	"created_at" timestamp DEFAULT now(),
	"last_login" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customers" (
	"wallet_address" text PRIMARY KEY NOT NULL,
	"email" text,
	"created_at" timestamp DEFAULT now(),
	"last_purchase" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "downloads" (
	"id" text PRIMARY KEY NOT NULL,
	"order_id" text NOT NULL,
	"product_id" text NOT NULL,
	"customer_wallet" text NOT NULL,
	"download_url" text,
	"expires_at" timestamp,
	"download_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" text PRIMARY KEY NOT NULL,
	"customer_wallet" text NOT NULL,
	"total_usd" numeric(10, 2),
	"total_crypto" numeric(18, 8),
	"currency" text,
	"tx_hash" text,
	"status" text,
	"items" json,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"price_usd" numeric(10, 2),
	"price_eth" numeric(18, 8),
	"price_usdc" numeric(10, 2),
	"category" text,
	"file_url" text,
	"file_type" text,
	"license" text,
	"status" text DEFAULT 'draft',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
