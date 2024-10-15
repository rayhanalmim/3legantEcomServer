"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const multiImage_route_1 = require("./modules/handleMultiImage/multiImage.route");
const ner_route_1 = require("./modules/nerCardX/ner.route");
const payment_route_1 = require("./modules/payment/payment.route");
const product_route_1 = require("./modules/products/product.route");
const email_route_1 = require("./modules/sendingEmail/email.route");
const user_route_1 = require("./modules/users/user.route");
const wishlist_route_1 = require("./modules/wishList/wishlist.route");
const app = (0, express_1.default)();
const port = 3013;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "https://sandbox.sslcommerz.com"],
    methods: ['GET', 'POST'],
    credentials: true,
}));
app.use(express_1.default.urlencoded({ extended: true }));
// Serve static files (for image access)
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.use("/api", product_route_1.ProductRoutes);
app.use("/api", user_route_1.UserRoute);
app.use("/api", wishlist_route_1.WishlistRoute);
app.use("/api", email_route_1.EmailRoute);
app.use("/payment", payment_route_1.PaymentRoute);
app.use("/api", multiImage_route_1.MultiImageRoute);
app.use("/api", ner_route_1.NerRoute);
// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the E-Commerce API');
});
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${port}`);
});
