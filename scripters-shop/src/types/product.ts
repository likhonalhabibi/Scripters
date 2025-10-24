import { products } from '@/db/schema';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';

export type Product = InferSelectModel<typeof products>;
export type NewProduct = InferInsertModel<typeof products>;

export interface ProductWithDetails extends Product {
  inStock: boolean;
  discountPercentage?: number;
}
