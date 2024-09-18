import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express, { Request, Response } from 'express';

const prisma = new PrismaClient();
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// Create a new product
app.post('/products', async (req: Request, res: Response) => {
  const {
    name,
    price,
    description,
    productRating,
    offerExpires,
    measurement,
    productOff,
    originalPrice,
    offerPrice,
    productCategory,
    isNewProduct,
    productImages,
    colors,
    reviews,
    additionalInfo,
  } = req.body;

  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price), // Ensure 'price' is handled as a Float
        description,
        productRating,
        offerExpires: new Date(offerExpires), // Parse date string to Date object
        measurement,
        productOff,
        originalPrice,
        offerPrice,
        productCategory,
        isNewProduct,
        productImages,
        colors,
        reviews,
        additionalInfo,
      },
    });
    res.json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Get all products
app.get('/products', async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get a product by ID
app.get('/products/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Update a product by ID
app.put('/products/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    price,
    description,
    productRating,
    offerExpires,
    measurement,
    productOff,
    originalPrice,
    offerPrice,
    productCategory,
    isNewProduct,
    productImages,
    colors,
    reviews,
    additionalInfo,
  } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        price,
        description,
        productRating,
        offerExpires: new Date(offerExpires), // Parse date string to Date object
        measurement,
        productOff,
        originalPrice,
        offerPrice,
        productCategory,
        isNewProduct,
        productImages,
        colors,
        reviews,
        additionalInfo,
      },
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete a product by ID
app.delete('/products/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedProduct = await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the E-Commerce API');
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
