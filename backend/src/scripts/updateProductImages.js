import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import Product from '../models/Product.js';

dotenv.config();

const IMAGE_BY_SKU = {
  'TSHIRT-001': { url: '/images/products/sample-tshirt.svg', alt: 'T-Shirt premium bleu marine' },
  'MUG-001': { url: '/images/products/sample-mug.svg', alt: 'Mug ceramique premium' }
};

const run = async () => {
  try {
    await connectDB();

    let updated = 0;

    const products = await Product.find({});

    for (const product of products) {
      const mapped = IMAGE_BY_SKU[product.sku];
      const hasPlaceholder = product.images?.[0]?.url === '/images/placeholder.png';

      if (mapped) {
        product.images = [mapped];
        await product.save();
        updated += 1;
        continue;
      }

      if (!product.images?.length || hasPlaceholder) {
        product.images = [{
          url: '/images/products/placeholder-product.svg',
          alt: product.name || 'Produit'
        }];
        await product.save();
        updated += 1;
      }
    }

    console.log(`Updated product images: ${updated}`);
    process.exit(0);
  } catch (error) {
    console.error('Update product images error:', error);
    process.exit(1);
  }
};

run();
