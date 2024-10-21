import { PrismaClient } from "@prisma/client";
import catchAsync from "../../utils/catchAsync";
import config from "../../config";
const prisma = new PrismaClient();

const payment = catchAsync(async (req, res) => {
    
});


export const StripeController = {
    payment
};