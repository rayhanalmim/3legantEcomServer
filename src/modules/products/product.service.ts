import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

const createProducts = async (req: Request, res: Response) => {
    const {
        productName,
        productImages,
        productRating,
        offerExpires,
        measurement,
        productOff,
        originalPrice,
        offerPrice,
        productCategory,
        isNewProduct,
        color,
        productDescription,
        additionalInfo,
        reviews,
    } = req.body;

    try {
        const newProduct = await prisma.product.create({
            data: {
                productName,
                productImages: JSON.stringify(productImages), 
                productRating: parseFloat(productRating), 
                offerExpires: new Date(offerExpires), 
                measurement,
                productOff,
                originalPrice: parseFloat(originalPrice), 
                offerPrice: parseFloat(offerPrice), 
                productCategory,
                isNewProduct: Boolean(isNewProduct), 
                color: JSON.stringify(color), 
                productDescription,
                additionalInfo: JSON.stringify(additionalInfo), 
                reviews: JSON.stringify(reviews), 
            },
        });
        res.json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create product' });
    }
}


const GetProducts = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

const GetSingleProducts = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) },
        });
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
}


const UpdateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
        productName,
        productImages,
        productRating,
        offerExpires,
        measurement,
        productOff,
        originalPrice,
        offerPrice,
        productCategory,
        isNewProduct,
        color,
        productDescription,
        additionalInfo,
        reviews,
    } = req.body;

    const updateData: any = {};

    if (productName !== undefined) updateData.productName = productName;
    if (productImages !== undefined) updateData.productImages = JSON.stringify(productImages);
    if (productRating !== undefined) updateData.productRating = parseFloat(productRating);
    if (offerExpires !== undefined) updateData.offerExpires = new Date(offerExpires);
    if (measurement !== undefined) updateData.measurement = measurement;
    if (productOff !== undefined) updateData.productOff = productOff;
    if (originalPrice !== undefined) updateData.originalPrice = parseFloat(originalPrice);
    if (offerPrice !== undefined) updateData.offerPrice = parseFloat(offerPrice);
    if (productCategory !== undefined) updateData.productCategory = productCategory;
    if (isNewProduct !== undefined) updateData.isNewProduct = Boolean(isNewProduct);
    if (color !== undefined) updateData.color = JSON.stringify(color);
    if (productDescription !== undefined) updateData.productDescription = productDescription;
    if (additionalInfo !== undefined) updateData.additionalInfo = JSON.stringify(additionalInfo);
    if (reviews !== undefined) updateData.reviews = JSON.stringify(reviews);

    try {
        const updatedProduct = await prisma.product.update({
            where: { id: parseInt(id) },
            data: updateData,
        });
        res.json(updatedProduct);
    } catch (error) {
        console.error("Update Error:", error); // Log error for debugging
        res.status(500).json({ error: 'Failed to update product' });
    }
}

const DeleteProducts = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedProduct = await prisma.product.delete({
            where: { id: parseInt(id) },
        });
        res.json(deletedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
}

export const ProductsController = {
    createProducts,
    GetProducts,
    GetSingleProducts,
    UpdateProduct,
    DeleteProducts
};