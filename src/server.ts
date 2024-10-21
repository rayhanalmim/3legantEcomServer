import cors from 'cors';
import express, { Request, Response } from 'express';
import path from 'path';
import { MultiImageRoute } from './modules/handleMultiImage/multiImage.route';
import { NerRoute } from './modules/nerCardX/ner.route';
import { PaymentRoute } from './modules/payment/payment.route';
import { ProductRoutes } from './modules/products/product.route';
import { EmailRoute } from './modules/sendingEmail/email.route';
import { UserRoute } from './modules/users/user.route';
import { WishlistRoute } from './modules/wishList/wishlist.route';
import { StripeRoute } from './modules/stripe/stripe.route';


const app = express();
const port = 3013;

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000", "https://sandbox.sslcommerz.com"],
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
// Serve static files (for image access)
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));


app.use("/api", ProductRoutes);
app.use("/api", UserRoute);
app.use("/api", WishlistRoute);
app.use("/api", EmailRoute);
app.use("/payment", PaymentRoute);
app.use("/api", MultiImageRoute);
app.use("/api", NerRoute)
app.use("/api", StripeRoute);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the E-Commerce API');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${port}`);
});
