import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

dotenv.config();

const run = async () => {
  try {
    await connectDB();

    const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@client.com';
    const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'Admin123!';

    const existing = await User.findOne({ email: adminEmail });
    if (existing) {
      console.log('Admin already exists:', adminEmail);
    } else {
      const admin = new User({
        email: adminEmail,
        password: adminPassword,
        firstName: 'Admin',
        lastName: 'Client',
        role: 'admin'
      });
      await admin.save();
      console.log('Created admin:', adminEmail);
    }

    const productsCount = await Product.countDocuments();
    if (productsCount === 0) {
      const samples = [
        {
          name: 'Sample T-Shirt',
          description: 'T-Shirt premium, confortable',
          price: 19.99,
          sku: 'TSHIRT-001',
          category: 'vêtements',
          stock: 100,
          images: [{ url: '/images/placeholder.png', alt: 'T-Shirt' }],
          isActive: true
        },
        {
          name: 'Sample Mug',
          description: 'Mug céramique premium',
          price: 9.99,
          sku: 'MUG-001',
          category: 'maison',
          stock: 50,
          images: [{ url: '/images/placeholder.png', alt: 'Mug' }],
          isActive: true
        }
      ];

      await Product.insertMany(samples);
      console.log('Inserted sample products:', samples.length);
    } else {
      console.log('Products already present:', productsCount);
    }

    console.log('\nSeed complete.');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

run();
