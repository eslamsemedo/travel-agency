import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: "MYSKY Travel Agency - Premium Travel Services in Egypt",
    template: "%s | MYSKY Travel Agency"
  },
  description: "Discover the world with MYSKY Travel Agency. Premium travel services including safari trips, sea adventures, hotel bookings, and guided tours across Egypt and beyond. Book your dream vacation today!",
  icons: {
    icon: '/imgs/logo4.png',
    shortcut: '/imgs/logo4.png',
    apple: '/imgs/logo4.png',
  },
  keywords: [
    "travel agency",
    "Egypt travel",
    "safari trips",
    "sea adventures",
    "hotel booking",
    "guided tours",
    "vacation packages",
    "travel services",
    "MYSKY travel",
    "Egypt tourism",
    "luxury travel",
    "adventure travel",
    "family vacations",
    "honeymoon packages",
    "business travel"
  ],
  authors: [{ name: "MYSKY Travel Agency" }],
  creator: "MYSKY Travel Agency",
  publisher: "MYSKY Travel Agency",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mysky-travel.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mysky-travel.com',
    siteName: 'MYSKY Travel Agency',
    title: 'MYSKY Travel Agency - Premium Travel Services in Egypt',
    description: 'Discover the world with MYSKY Travel Agency. Premium travel services including safari trips, sea adventures, hotel bookings, and guided tours across Egypt and beyond.',
    images: [
      {
        url: '/imgs/logo4.png',
        width: 1200,
        height: 630,
        alt: 'MYSKY Travel Agency Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MYSKY Travel Agency - Premium Travel Services in Egypt',
    description: 'Discover the world with MYSKY Travel Agency. Premium travel services including safari trips, sea adventures, hotel bookings, and guided tours.',
    images: ['/imgs/logo4.png'],
    creator: '@mysky_travel',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <link rel="icon" href="/imgs/logo4.png" />
        <link rel="apple-touch-icon" href="/imgs/logo4.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              "name": "MYSKY Travel Agency",
              "description": "Premium travel services including safari trips, sea adventures, hotel bookings, and guided tours across Egypt and beyond.",
              "url": "https://mysky-travel.com",
              "logo": "https://mysky-travel.com/imgs/logo4.png",
              "image": "https://mysky-travel.com/imgs/logo4.png",
              "telephone": "+20-1101515111",
              "email": "Myskytravel1@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "EG",
                "addressRegion": "Egypt"
              },
              "sameAs": [
                "https://www.instagram.com/mysky_travel"
              ],
              "openingHours": "Mo-Su 09:00-18:00",
              "priceRange": "$$",
              "serviceType": [
                "Safari Trips",
                "Sea Adventures", 
                "Hotel Bookings",
                "Guided Tours",
                "Vacation Packages"
              ],
              "areaServed": {
                "@type": "Country",
                "name": "Egypt"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Travel Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Safari Trips"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Sea Adventures"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "Hotel Bookings"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className={`${geist.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
