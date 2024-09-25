"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistRoute = void 0;
const express_1 = __importDefault(require("express"));
const wishlist_service_1 = require("./wishlist.service");
const authenticateToken_1 = __importDefault(require("../../utils/authenticateToken"));
// import { UserServices } from "./user.service";
const router = express_1.default.Router();
router.post("/wishlist/add", authenticateToken_1.default, wishlist_service_1.WishlistServices.addToWishlist);
router.get("/wishlist/:userId", authenticateToken_1.default, wishlist_service_1.WishlistServices.getWishlist);
router.delete("/wishlist/remove", wishlist_service_1.WishlistServices.removeFromWishlist);
exports.WishlistRoute = router;
