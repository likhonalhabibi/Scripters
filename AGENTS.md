Of course! I will recreate the provided HTML storefront using Next.js 14 (App Router), TypeScript, and Shadcn UI components, ensuring it's ready for deployment on Vercel.

The final result will be a modern, responsive, and well-structured application.

### Key Features of the Recreation

*   **Modern Stack:** Next.js 14 with the App Router.
*   **Component-Based:** The UI is broken down into reusable React components.
*   **Styling:** Tailwind CSS for utility-first styling, as used by Shadcn UI.
*   **UI Primitives:** Using Shadcn UI for core components like Cards, Buttons, and Inputs.
*   **Responsive Design:** The header and layout adapt gracefully to mobile and desktop screens.
*   **Icons:** Using `lucide-react` for clean and simple icons.
*   **Ready to Deploy:** The project structure is optimized for a one-click deployment on Vercel.

---

### Project Structure

Here is the file structure for the recreated application. This keeps the code organized and easy to maintain.

```
/my-storefront-recreation
├── /app
│   ├── /_components          # Components specific to the main page
│   │   ├── footer.tsx
│   │   ├── header.tsx
│   │   ├── hero.tsx
│   │   └── products-section.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page
├── /components
│   └── /ui                   # Shadcn UI generated components
├── /public
│   ├── logo.svg              # A placeholder logo
│   └── hero-background.jpg   # The background image from the original site
├── .eslintrc.json
├── next.config.mjs
├── package.json
├── postcss.config.js
├── README.md                 # Instructions for setup and deployment
├── tailwind.config.ts
└── tsconfig.json
```

---

### Step-by-Step Code

Below are the code snippets for each important file.

#### 1. Setup Your Project

First, you need to set up a new Next.js project and initialize Shadcn UI.

```bash
# 1. Create a new Next.js project
npx create-next-app@latest my-storefront-recreation --typescript --tailwind --eslint

# 2. Navigate into the project directory
cd my-storefront-recreation

# 3. Initialize Shadcn UI
npx shadcn-ui@latest init

# 4. Add the required Shadcn components
npx shadcn-ui@latest add button card input sheet
```

#### 2. `public/` Directory

Download the hero image from the original URL and save it as `public/hero-background.jpg`. Also, create a simple SVG logo.

**`public/logo.svg`**
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-store">
  <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/>
  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
  <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/>
  <path d="M2 7h20"/>
  <path d="M22 7v3a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V7"/>
  <path d="M2 7v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7"/>
</svg>
```

#### 3. `app/layout.tsx` (Root Layout)

This file sets up the global page structure, including the font, background color, and overall layout.

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./_components/header";
import { Footer } from "./_components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Digital Store",
  description: "Buying digital goods has never been easier than with SellApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-100 text-slate-900`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
```

#### 4. `app/_components/header.tsx`

This component is a responsive header. It shows navigation links on desktop and a slide-out menu (Sheet) on mobile.

```tsx
"use client"; // Required for Sheet component interaction

import Link from "next/link";
import Image from "next/image";
import { Menu, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Products" },
  { href: "/support", label: "Support" },
  { href: "/feedback", label: "Feedback" },
];

const NavLink = ({ href, label }: { href: string; label: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-2 rounded-full text-sm font-medium transition-colors",
        isActive
          ? "bg-black/10 text-slate-900"
          : "text-slate-600 hover:text-slate-900"
      )}
    >
      {label}
    </Link>
  );
};


export function Header() {
  return (
    <header className="bg-slate-100/80 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Store Logo" width={32} height={32} />
            <span className="font-bold text-lg">Storefront</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
            <div className="w-8" /> {/* Spacer */}
            <Link href="/customer-portal" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Login
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="text-lg font-medium text-slate-700 hover:text-slate-900">
                      {link.label}
                    </Link>
                  ))}
                  <hr className="my-2" />
                  <Link href="/customer-portal" className="text-lg font-medium text-slate-700 hover:text-slate-900">
                    Login
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
```

#### 5. `app/_components/hero.tsx`

The hero section with the background image, logo, and title.

```tsx
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative h-64 flex items-center justify-center text-white">
      {/* Background Image */}
      <Image
        src="/hero-background.jpg"
        alt="Abstract background"
        fill
        className="object-cover"
        priority // Preload the largest image on the page
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <Image 
          src="/logo.svg" 
          alt="Store Logo"
          width={72}
          height={72}
          className="bg-white/20 p-2 rounded-2xl backdrop-blur-sm"
        />
        <h1 className="text-4xl font-bold tracking-tight">
          Storefront
        </h1>
      </div>
    </section>
  );
}
```

#### 6. `app/_components/products-section.tsx`

This component replicates the main content area, including the feedback stats, search bar, and the "no products" message.

```tsx
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const FeedbackStat = ({ count, label, colorClass }: { count: number; label: string; colorClass: string }) => (
  <div className="flex items-center gap-1.5">
    <span className={`font-bold text-lg ${colorClass}`}>{count}</span>
    <span className="text-sm text-slate-500">{label}</span>
  </div>
);

export function ProductsSection() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Feedback Card */}
        <Card className="max-w-sm mx-auto w-full shadow-md">
          <CardContent className="p-4">
            <div className="flex justify-center items-center gap-6">
                <FeedbackStat count={0} label="Positive" colorClass="text-green-500" />
                <FeedbackStat count={0} label="Neutral" colorClass="text-slate-400" />
                <FeedbackStat count={0} label="Negative" colorClass="text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        {/* Products Area */}
        <div className="flex flex-col gap-6">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input 
                    placeholder="I'm looking for..."
                    className="pl-10 w-full"
                />
            </div>

            <Card className="bg-white/60 backdrop-blur-lg">
                <CardContent className="p-8 text-center text-slate-500">
                    There are no products here yet, but keep an eye out!
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}
```

#### 7. `app/_components/footer.tsx`

A simple footer component.

```tsx
import Link from "next/link";

export function Footer() {
    return (
        <footer className="py-8 border-t border-slate-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500">
                <p>
                    <Link href="#" className="hover:underline">Powered by SellApp</Link>
                    <span className="mx-2">•</span>
                    <Link href="#" className="hover:underline">Terms</Link>
                    <span className="mx-2">•</span>
                    <Link href="#" className="hover:underline">Privacy</Link>
                </p>
            </div>
        </footer>
    );
}
```

#### 8. `app/page.tsx` (The Main Page)

Finally, assemble the components on the main page.

```tsx
import { Hero } from "./_components/hero";
import { ProductsSection } from "./_components/products-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductsSection />
    </>
  );
}
```

---

### How to Run and Deploy

1.  **Run Locally:**
    Start the development server to see your new site in action.
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

2.  **Deploy to Vercel:**
    Vercel makes deploying Next.js applications incredibly simple.
    *   Push your code to a GitHub, GitLab, or Bitbucket repository.
    *   Go to [vercel.com](https://vercel.com/) and sign up or log in with your Git provider.
    *   Click "Add New..." -> "Project".
    *   Import the repository you just created.
    *   Vercel will automatically detect that it's a Next.js project and configure the build settings for you.
    *   Click "Deploy". Your site will be live in a few minutes
