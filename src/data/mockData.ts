import type { BadgeType } from '../types';

export const MOCK_USERS = [
  {
    id: '1',
    name: 'Sarah Schmidt',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    trustScore: 95,
    reviewCount: 48,
    language: 'en' as const,
    badges: ['expert', 'photographer', 'top-reviewer'] as BadgeType[],
    level: 42,
    xp: 8450,
    specialties: ['Italian', 'French']
  },
  {
    id: '2',
    name: 'Marcus Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    trustScore: 88,
    reviewCount: 32,
    language: 'en' as const,
    badges: ['cuisine-specialist', 'verified'] as BadgeType[],
    level: 35,
    xp: 6200,
    specialties: ['Asian', 'Fusion']
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    trustScore: 92,
    reviewCount: 67,
    language: 'en' as const,
    badges: ['expert', 'top-reviewer', 'verified'] as BadgeType[],
    level: 48,
    xp: 9100,
    specialties: ['Spanish', 'Mediterranean']
  },
  {
    id: '4',
    name: 'Hans Mueller',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    trustScore: 87,
    reviewCount: 29,
    language: 'de' as const,
    badges: ['local-expert', 'verified'] as BadgeType[],
    level: 28,
    xp: 4200,
    specialties: ['German', 'Austrian']
  },
  {
    id: '5',
    name: 'Yuki Tanaka',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    trustScore: 94,
    reviewCount: 53,
    language: 'en' as const,
    badges: ['cuisine-specialist', 'photographer', 'verified'] as BadgeType[],
    level: 39,
    xp: 7300,
    specialties: ['Japanese', 'Korean']
  }
];

export const MOCK_REVIEWS = [
  {
    id: '1',
    text: `The authenticity of this Italian restaurant is remarkable. Having lived in Naples for 5 years, I can confidently say their pizza is the closest you'll get to true Neapolitan style in Berlin. The dough is perfectly fermented for 48 hours, creating that characteristic leopard-spotted crust when baked in their 400°C wood-fired oven.

Their house-made pasta is equally impressive - the texture of their orecchiette with broccoli rabe is exactly what you'd find in Puglia. Even their wine list showcases small, family-owned Italian vineyards rather than commercial labels.

What particularly impressed me was their seasonal menu changes, reflecting true Italian cooking philosophy of using what's fresh and available. During my visit, they were featuring white truffles from Alba - a true delicacy served with proper reverence.`,
    rating: 5,
    authenticityScore: 96,
    language: 'en' as const,
    photos: [
      'https://images.unsplash.com/photo-1481931098730-318b6f776db0',
      'https://images.unsplash.com/photo-1546549032-9571cd6b27df'
    ],
    userId: '1',
    restaurantId: '1',
    createdAt: '2024-03-15T14:30:00Z',
    verified: true,
    helpfulCount: 145,
    achievements: ['first-photo', 'detailed-review', 'expert-insight']
  },
  {
    id: '2',
    text: `Great atmosphere but the food was slightly overpriced. The sushi was fresh though!`,
    rating: 4,
    authenticityScore: 88,
    language: 'en' as const,
    photos: [],
    userId: '1',
    restaurantId: '2',
    createdAt: '2024-03-10T18:45:00Z',
    verified: true,
    helpfulCount: 78,
    achievements: ['verified-review']
  },
  {
    id: '3',
    text: `Als gebürtiger Berliner, der in einem traditionellen deutschen Restaurant aufgewachsen ist, kann ich bestätigen, dass dieses Lokal die authentische Berliner Küche perfekt repräsentiert.`,
    rating: 5,
    authenticityScore: 94,
    language: 'de' as const,
    photos: [
      'https://images.unsplash.com/photo-1515467837915-15c4777ba46a'
    ],
    userId: '4',
    restaurantId: '3',
    createdAt: '2024-03-13T12:30:00Z',
    verified: true,
    helpfulCount: 89,
    achievements: ['local-expert', 'cultural-insight']
  }
];

export const MOCK_RESTAURANTS = [
  {
    id: '1',
    name: 'Bella Italia',
    address: 'Hauptstraße 123, Berlin',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    authenticityScore: 95,
    reviewCount: 128,
    cuisine: 'Italian',
    priceRange: '€€',
    specialties: ['Homemade Pasta', 'Wood-fired Pizza', 'Regional Italian Wines'],
    photos: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
      'https://images.unsplash.com/photo-1481931098730-318b6f776db0',
      'https://images.unsplash.com/photo-1546549032-9571cd6b27df'
    ]
  },
  {
    id: '2',
    name: 'Sushi Master',
    address: 'Kantstraße 45, Berlin',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
    authenticityScore: 92,
    reviewCount: 89,
    cuisine: 'Japanese',
    priceRange: '€€€',
    specialties: ['Omakase', 'Fresh Sashimi', 'Traditional Edomae Sushi'],
    photos: [
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
      'https://images.unsplash.com/photo-1553621042-f6e147245754'
    ]
  },
  {
    id: '3',
    name: 'Berliner Ecke',
    address: 'Friedrichstraße 78, Berlin',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1515467837915-15c4777ba46a',
    authenticityScore: 94,
    reviewCount: 156,
    cuisine: 'German',
    priceRange: '€€',
    specialties: ['Traditional Currywurst', 'Königsberger Klopse', 'Craft Beer'],
    photos: [
      'https://images.unsplash.com/photo-1515467837915-15c4777ba46a',
      'https://images.unsplash.com/photo-1599921841143-819065a55cc6'
    ]
  },
  {
    id: '4',
    name: 'El Rincón',
    address: 'Schönhauser Allee 5, Berlin',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b',
    authenticityScore: 93,
    reviewCount: 112,
    cuisine: 'Spanish',
    priceRange: '€€',
    specialties: ['Traditional Tapas', 'Paella', 'Spanish Wines'],
    photos: [
      'https://images.unsplash.com/photo-1515443961218-a51367888e4b',
      'https://images.unsplash.com/photo-1524510197923-2a5ed240c2d3'
    ]
  },
  {
    id: '5',
    name: 'Dim Sum House',
    address: 'Torstraße 99, Berlin',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327',
    authenticityScore: 91,
    reviewCount: 143,
    cuisine: 'Chinese',
    priceRange: '€€',
    specialties: ['Traditional Dim Sum', 'Cantonese BBQ', 'Chinese Tea Service'],
    photos: [
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327',
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb'
    ]
  }
];