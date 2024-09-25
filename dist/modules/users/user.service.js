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
exports.UserServices = void 0;
const client_1 = require("@prisma/client");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const Registration = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, profileImage, username } = req.body;
    // Check if the user already exists
    const existingUser = yield prisma.user.findUnique({
        where: { email }
    });
    if (existingUser) {
        return res.status(400).json({ message: "User with this email already exists." });
    }
    // Hash the password
    const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
    // Create a new user
    const user = yield prisma.user.create({
        data: {
            name,
            username,
            email,
            password: hashedPassword,
            profileImage
        }
    });
    // Generate JWT token
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });
    return res.status(201).json({ message: "User registered successfully", token, user });
}));
const LogIn = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { emailOrUsername, password } = req.body;
    // Check if the user exists by email or username
    const user = yield prisma.user.findFirst({
        where: {
            OR: [
                { email: emailOrUsername },
                { username: emailOrUsername }
            ]
        }
    });
    if (!user) {
        return res.status(400).json({ message: "Invalid email/username or password." });
    }
    // Compare the passwords
    const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email/username or password." });
    }
    // Generate JWT token
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });
    return res.status(200).json({ message: "Login successful", token, user });
}));
exports.UserServices = {
    Registration,
    LogIn
};
