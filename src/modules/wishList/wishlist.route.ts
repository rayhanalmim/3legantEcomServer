import express from "express";
import { WishlistServices } from "./wishlist.service";
// import { UserServices } from "./user.service";
const router = express.Router();

router.post("/wishlist/add", WishlistServices.addToWishlist);
router.get("/wishlist/:userId", WishlistServices.getWishlist);
router.delete("/wishlist/remove", WishlistServices.removeFromWishlist);

export const WishlistRoute = router;