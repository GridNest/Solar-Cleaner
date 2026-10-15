import './globals.css';

export const metadata = {
  title: 'Solar Cleaner – Professional Solar Panel Cleaning in Lucknow',
  description: 'Boost your solar power generation by up to 30%. Professional solar panel cleaning for homes, societies, RWAs, and commercial factories in Lucknow. Soft brushes & treated RO water.',
  keywords: [
    'Solar panel cleaning Lucknow',
    'Rooftop solar maintenance Lucknow',
    'Solar panel washing service',
    'Solar panel cleaner near me',
    'RWA solar maintenance',
    'Commercial solar cleaning Uttar Pradesh',
    'Solar AMC contract Lucknow'
  ],
  authors: [{ name: 'Solar Cleaner' }],
  creator: 'Solar Cleaner',
  publisher: 'Solar Cleaner',
  formatDetection: {
    telephone: true,
    date: false,
    address: true,
    email: true,
  },
  openGraph: {
    title: 'Solar Cleaner – Professional Solar Panel Cleaning in Lucknow',
    description: 'Clean panels. More power. Lower electricity bills. Book certified doorstep solar cleaning in Lucknow.',
    url: 'https://solarcleaner.in',
    siteName: 'Solar Cleaner',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solar Cleaner – Professional Solar Panel Cleaning',
    description: 'Professional solar panel cleaning for homes, societies, and industrial plants. Book a visit or get an instant estimate.',
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
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  'name': 'SolarCleaner.in',
  'description': 'Professional solar panel cleaning for homes, housing societies, RWAs, and commercial factories in Lucknow.',
  'telephone': '+919648847816',
  'url': 'https://solarcleaner.in',
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': 'Lucknow',
    'addressRegion': 'Uttar Pradesh',
    'addressCountry': 'IN'
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': 26.8467,
    'longitude': 80.9462
  },
  'openingHoursSpecification': {
    '@type': 'OpeningHoursSpecification',
    'dayOfWeek': [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ],
    'opens': '07:00',
    'closes': '19:00'
  },
  'priceRange': '₹500 - ₹5000+',
  'areaServed': [
    {
      '@type': 'City',
      'name': 'Lucknow'
    }
  ],
  'hasOfferCatalog': {
    '@type': 'OfferCatalog',
    'name': 'Solar Cleaning Services',
    'itemListElement': [
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Residential Rooftop Solar Cleaning',
          'description': 'Safe cleaning for 1-10 kW home solar panels using demineralized water and soft scratch-free brushes.'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Housing Society & RWA Solar Maintenance',
          'description': 'Regular monthly cleaning for common lift & pump solar systems with committee tax invoices.'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Commercial & Industrial Solar Plant Cleaning',
          'description': 'Safety-compliant cleaning for factories, warehouses, schools, and hospitals with detailed photo reports.'
        }
      }
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
