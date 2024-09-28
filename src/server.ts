import cors from 'cors';
import express, { Request, Response } from 'express';
import { ProductRoutes } from './modules/products/product.route';
import { EmailRoute } from './modules/sendingEmail/email.route';
import { UserRoute } from './modules/users/user.route';
import { WishlistRoute } from './modules/wishList/wishlist.route';

const app = express();
const port = 3013;

app.use(express.json());
app.use(cors());

app.use("/api", ProductRoutes);
app.use("/api", UserRoute);
app.use("/api", WishlistRoute);
app.use("/api", EmailRoute);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the E-Commerce API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
