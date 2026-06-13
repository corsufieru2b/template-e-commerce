/**
 * MOCK PRODUCTS (Fallback pour développement)
 *
 * Utilisé lorsque l'API backend ne renvoie aucun produit.
 */

export const mockProducts = [
  {
    _id: 'mock-1',
    name: 'Casque audio sans fil Premium',
    description:
      "Casque Bluetooth avec réduction de bruit active, autonomie 30h et confort longue durée.",
    price: 129.99,
    originalPrice: 179.99,
    discount: 27,
    sku: 'HEADSET-001',
    category: 'électronique',
    stock: 38,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    ratings: { average: 4.6, count: 89 },
    images: [
      { url: '/images/products/wireless-headphones.svg', alt: 'Casque audio sans fil premium' }
    ],
    specifications: [
      { key: 'Autonomie', value: '30 heures' },
      { key: 'Connexion', value: 'Bluetooth 5.2' },
      { key: 'Réduction de bruit', value: 'Active (ANC)' }
    ]
  },
  {
    _id: 'mock-2',
    name: 'Sac à dos urbain imperméable',
    description:
      "Sac à dos moderne avec compartiment laptop 15\" , port de chargement USB et poches antivol.",
    price: 59.9,
    sku: 'BAG-URB-001',
    category: 'maison',
    stock: 62,
    isFeatured: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    ratings: { average: 4.4, count: 44 },
    images: [
      { url: '/images/products/urban-backpack.svg', alt: 'Sac a dos urbain impermeable' }
    ],
    specifications: [
      { key: 'Capacité', value: '20L' },
      { key: 'Matériau', value: 'Polyester imperméable' },
      { key: 'Laptop', value: '15 pouces' }
    ]
  },
  {
    _id: 'mock-3',
    name: 'Montre connectée multisports',
    description:
      "Suivi d’activité, fréquence cardiaque, GPS intégré et veille intelligente.",
    price: 89.9,
    originalPrice: 119.9,
    discount: 25,
    sku: 'WATCH-001',
    category: 'sport',
    stock: 22,
    isFeatured: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(),
    ratings: { average: 4.2, count: 57 },
    images: [
      { url: '/images/products/smartwatch.svg', alt: 'Montre connectee multisports' }
    ],
    specifications: [
      { key: 'Autonomie', value: '12 jours' },
      { key: 'Etanchéité', value: '50m (5ATM)' },
      { key: 'GPS', value: 'Oui' }
    ]
  }
];
