import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
const prisma = new PrismaClient();

const uploadMultiImage = catchAsync(async (req, res) => {
    
});


export const ImageController = {
    uploadMultiImage
};