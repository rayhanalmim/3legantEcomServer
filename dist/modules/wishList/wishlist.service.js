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
exports.WishlistServices = void 0;
const client_1 = require("@prisma/client");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const prisma = new client_1.PrismaClient();
const addToWishlist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId; // Safely extract userId
    const { productId } = req.body;
    console.log('user Credential', userId, productId);
    // Find the user
    const user = yield prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    // Ensure currentWishlist is an array of strings or numbers
    const currentWishlist = Array.isArray(user.wishlist) ? user.wishlist : [];
    // Check if the product ID already exists in the wishlist
    if (currentWishlist.includes(productId)) {
        return res.status(400).json({ error: 'Product already in wishlist' });
    }
    // Check if the product exists in the database
    const productExists = yield prisma.product.findUnique({
        where: { id: productId },
    });
    if (!productExists) {
        return res.status(404).json({ error: `Product not found with ID: ${productId}` });
    }
    // Add the new product ID to the wishlist array
    const updatedWishlist = [...currentWishlist, productId];
    // Update the user's wishlist in the database
    yield prisma.user.update({
        where: { id: userId },
        data: { wishlist: updatedWishlist },
    });
    res.json(updatedWishlist);
}));
const getWishlist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId; // Safely extract userId
    console.log('from server : ', userId);
    // Find the user
    const user = yield prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    // Ensure productIds is an array of numbers (or strings)
    const productIds = Array.isArray(user.wishlist)
        ? user.wishlist.filter(id => typeof id === 'number') // Filter to ensure only numbers are included
        : []; // Fallback to an empty array
    // Fetch products using the IDs
    const products = yield prisma.product.findMany({
        where: {
            id: { in: productIds }
        }
    });
    res.json(products);
}));
const removeFromWishlist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { productId } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId; // Safely extract userId
    // Find the user
    const user = yield prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    // Ensure currentWishlist is an array of strings or numbers
    const currentWishlist = Array.isArray(user.wishlist)
        ? user.wishlist.filter(id => typeof id === 'number' || typeof id === 'string')
        : []; // Fallback to an empty array
    // Check if the product ID exists in the wishlist
    if (!currentWishlist.includes(productId)) {
        return res.status(400).json({ error: 'Product not found in wishlist' });
    }
    // Remove the product ID from the wishlist
    const updatedWishlist = currentWishlist.filter(id => id !== productId);
    // Update the user's wishlist in the database
    yield prisma.user.update({
        where: { id: userId },
        data: { wishlist: updatedWishlist },
    });
    res.json(updatedWishlist);
}));
exports.WishlistServices = {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
};
