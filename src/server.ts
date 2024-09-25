import cors from 'cors';
import express, { Request, Response } from 'express';
import { ProductRoutes } from './modules/products/product.route';
import { UserRoute } from './modules/users/user.route';
import { WishlistRoute } from './modules/wishList/wishlist.route';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use("/api", ProductRoutes);
app.use("/api", UserRoute);
app.use("/api", WishlistRoute);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the E-Commerce API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
