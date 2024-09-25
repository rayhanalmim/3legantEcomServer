"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const product_route_1 = require("./modules/products/product.route");
const user_route_1 = require("./modules/users/user.route");
const app = (0, express_1.default)();
const port = 5000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api", product_route_1.ProductRoutes);
app.use("/api", user_route_1.UserRoute);
// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the E-Commerce API');
});
// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
