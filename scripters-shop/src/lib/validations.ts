import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  price: z.number().positive('Price must be positive'),
  inventory: z.number().int().nonnegative('Inventory cannot be negative'),
  category: z.string().min(1, 'Category is required'),
});

export const checkoutSchema = z.object({
  shippingAddress: z.object({
    name: z.string().min(2, 'Name is required'),
    address: z.string().min(5, 'Address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    zip: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
    country: z.string().min(2, 'Country is required'),
  }),
});
