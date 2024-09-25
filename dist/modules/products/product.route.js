"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_service_1 = require("./product.service");
const router = express_1.default.Router();
router.post("/create-product", product_service_1.ProductsController.createProducts);
router.get("/get-products", product_service_1.ProductsController.GetProducts);
router.get("/get-product/:id", product_service_1.ProductsController.GetSingleProducts);
router.put("/update-product/:id", product_service_1.ProductsController.UpdateProduct);
router.delete("/delete-product/:id", product_service_1.ProductsController.DeleteProducts);
exports.ProductRoutes = router;
