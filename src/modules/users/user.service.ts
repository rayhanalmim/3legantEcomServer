import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
const prisma = new PrismaClient();

const Registration = catchAsync(async (req: Request, res: Response) => {
    
});


const LogIn = catchAsync(async (req: Request, res: Response) => {
    
});


export const UserServices = {
    Registration, 
    LogIn
};