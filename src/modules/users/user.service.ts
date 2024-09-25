import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
const prisma = new PrismaClient();

const JWT_SECRET = '01845fa9e963534a6b29ae6d1bab1de090be158183e262494c2d59b51597bdb7c7ea3073d1c8fbdfcaf7b676305dfd9aedd7aa65cccef4fcaf20d7b9263e7264';

const Registration = catchAsync(async (req, res) => {
  const { name, email, password, profileImage, username } = req.body;

  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    return res.status(400).json({ message: "User with this email already exists." });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create a new user
  const user = await prisma.user.create({
    data: {
      name,
      username,
      email,
      password: hashedPassword,
      profileImage
    }
  });

  // Generate JWT token
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });

  return res.status(201).json({ message: "User registered successfully", token, user });

});


const LogIn = catchAsync(async (req, res) => {
  const { emailOrUsername, password } = req.body;

  // Check if the user exists by email or username
  const user = await prisma.user.findFirst({
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
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email/username or password." });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });

  return res.status(200).json({ message: "Login successful", token, user });
});



export const UserServices = {
  Registration,
  LogIn
};