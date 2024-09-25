"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const client_1 = require("@prisma/client");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const prisma = new client_1.PrismaClient();
const createProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productName, productImages, productRating, offerExpires, measurement, productOff, originalPrice, offerPrice, productCategory, isNewProduct, color, productDescription, additionalInfo, reviews, } = req.body;
    const newProduct = yield prisma.product.create({
        data: {
            productName,
            productImages,
            productRating: parseFloat(productRating),
            offerExpires: new Date(offerExpires),
            measurement,
            productOff,
            originalPrice: parseFloat(originalPrice),
            offerPrice: parseFloat(offerPrice),
            productCategory,
            isNewProduct: Boolean(isNewProduct),
            color,
            productDescription,
            additionalInfo,
            reviews,
        },
    });
    res.json(newProduct);
}));
const GetProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield prisma.product.findMany();
    res.json(products);
}));
const GetSingleProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield prisma.product.findUnique({
        where: { id: parseInt(id) },
    });
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).json({ error: 'Product not found' });
    }
}));
const UpdateProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { productName, productImages, productRating, offerExpires, measurement, productOff, originalPrice, offerPrice, productCategory, isNewProduct, color, productDescription, additionalInfo, reviews, } = req.body;
    const updateData = {};
    if (productName !== undefined)
        updateData.productName = productName;
    if (productImages !== undefined)
        updateData.productImages = JSON.stringify(productImages);
    if (productRating !== undefined)
        updateData.productRating = parseFloat(productRating);
    if (offerExpires !== undefined)
        updateData.offerExpires = new Date(offerExpires);
    if (measurement !== undefined)
        updateData.measurement = measurement;
    if (productOff !== undefined)
        updateData.productOff = productOff;
    if (originalPrice !== undefined)
        updateData.originalPrice = parseFloat(originalPrice);
    if (offerPrice !== undefined)
        updateData.offerPrice = parseFloat(offerPrice);
    if (productCategory !== undefined)
        updateData.productCategory = productCategory;
    if (isNewProduct !== undefined)
        updateData.isNewProduct = Boolean(isNewProduct);
    if (color !== undefined)
        updateData.color = JSON.stringify(color);
    if (productDescription !== undefined)
        updateData.productDescription = productDescription;
    if (additionalInfo !== undefined)
        updateData.additionalInfo = JSON.stringify(additionalInfo);
    if (reviews !== undefined)
        updateData.reviews = JSON.stringify(reviews);
    const updatedProduct = yield prisma.product.update({
        where: { id: parseInt(id) },
        data: updateData,
    });
    res.json(updatedProduct);
}));
const DeleteProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedProduct = yield prisma.product.delete({
        where: { id: parseInt(id) },
    });
    res.json(deletedProduct);
}));
exports.ProductsController = {
    createProducts,
    GetProducts,
    GetSingleProducts,
    UpdateProduct,
    DeleteProducts
};
