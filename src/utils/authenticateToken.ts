import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = '01845fa9e963534a6b29ae6d1bab1de090be158183e262494c2d59b51597bdb7c7ea3073d1c8fbdfcaf7b676305dfd9aedd7aa65cccef4fcaf20d7b9263e7264';

// Define an interface for your request to include the user data
interface AuthenticatedRequest extends Request {
    user?: { id: number; userId: number; email: string }; // Ensure userId is included
}

// JWT authentication middleware
const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'Access denied, token missing.' });
    }

    // Verify the token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err || !decoded) {
            return res.status(403).json({ message: 'Invalid token.' });
        }

        // Attach user data to the request object
        req.user = decoded as { id: number; userId: number; email: string }; // Cast to the correct type

        console.log(req.user);
        next();
    });
};

export default authenticateToken;
