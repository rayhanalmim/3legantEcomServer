import { PrismaClient } from "@prisma/client";
import catchAsync from "../../utils/catchAsync";
const prisma = new PrismaClient();

const addToWishlist = catchAsync(async (req, res) => {
    const userId = req.user?.userId; // Safely extract userId
    const {  productId } = req.body;

    // Find the user
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Ensure currentWishlist is an array of strings or numbers
    const currentWishlist = Array.isArray(user.wishlist) ? user.wishlist : [];

    // Check if the product ID already exists in the wishlist
    if (currentWishlist.includes(productId)) {
        return res.status(404).json({ error: 'Product already in wishlist' });
    }

    // Check if the product exists in the database
    const productExists = await prisma.product.findUnique({
        where: { id: productId },
    });

    if (!productExists) {
        return res.status(404).json({ error: `Product not found with ID: ${productId}` });
    }

    // Add the new product ID to the wishlist array
    const updatedWishlist = [...currentWishlist, productId];

    // Update the user's wishlist in the database
    await prisma.user.update({
        where: { id: userId },
        data: { wishlist: updatedWishlist },
    });

    res.json(updatedWishlist);
});



const getWishlist = catchAsync(async  (req, res) => {
    const userId = req.user?.userId; // Safely extract userId

    console.log('from server : ', userId);

    // Find the user
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Ensure productIds is an array of numbers (or strings)
    const productIds: number[] = Array.isArray(user.wishlist) 
        ? user.wishlist.filter(id => typeof id === 'number') // Filter to ensure only numbers are included
        : []; // Fallback to an empty array

    // Fetch products using the IDs
    const products = await prisma.product.findMany({
        where: {
            id: { in: productIds }
        }
    });

    res.json(products);
});



const removeFromWishlist = catchAsync(async (req, res) => {
    const { productId } = req.body;
    const userId = req.user?.userId; // Safely extract userId

    // Find the user
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Ensure currentWishlist is an array of strings or numbers
    const currentWishlist: (number | string)[] = Array.isArray(user.wishlist) 
        ? user.wishlist.filter(id => typeof id === 'number' || typeof id === 'string') 
        : []; // Fallback to an empty array

    // Check if the product ID exists in the wishlist
    if (!currentWishlist.includes(productId)) {
        return res.status(400).json({ error: 'Product not found in wishlist' });
    }

    // Remove the product ID from the wishlist
    const updatedWishlist = currentWishlist.filter(id => id !== productId);

    // Update the user's wishlist in the database
    await prisma.user.update({
        where: { id: userId },
        data: { wishlist: updatedWishlist },
    });

    res.json(updatedWishlist);
});




export const WishlistServices = {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
};