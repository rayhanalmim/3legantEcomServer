import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
const prisma = new PrismaClient();

const createProducts = catchAsync(async (req: Request, res: Response) => {
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

    const newProduct = await prisma.product.create({
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
});

const GetProducts = catchAsync(async (req: Request, res: Response) => {
    const products = await prisma.product.findMany();
    res.json(products);
});


const GetSingleProducts = catchAsync(async (req, res) => {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
    });
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});


const UpdateProduct = catchAsync(async (req: Request, res: Response) => {
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

    const updatedProduct = await prisma.product.update({
        where: { id: parseInt(id) },
        data: updateData,
    });
    res.json(updatedProduct);
});

const DeleteProducts = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedProduct = await prisma.product.delete({
        where: { id: parseInt(id) },
    });
    res.json(deletedProduct);
});

export const ProductsController = {
    createProducts,
    GetProducts,
    GetSingleProducts,
    UpdateProduct,
    DeleteProducts
};