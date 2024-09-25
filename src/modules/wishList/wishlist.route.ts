import express from "express";
import { WishlistServices } from "./wishlist.service";
import authenticateToken from "../../utils/authenticateToken";
// import { UserServices } from "./user.service";
const router = express.Router();

router.post("/wishlist/add", authenticateToken, WishlistServices.addToWishlist);
router.get("/wishlist/:userId", authenticateToken, WishlistServices.getWishlist);
router.delete("/wishlist/remove", WishlistServices.removeFromWishlist);

export const WishlistRoute = router;