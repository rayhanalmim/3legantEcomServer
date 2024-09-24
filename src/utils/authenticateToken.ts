import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Define an interface for your request to include the user data
interface AuthenticatedRequest extends Request {
    user?: any; // Adjust this type according to your user schema
}

// JWT authentication middleware
const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    // Check if the Authorization header is present and properly formatted
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied, token missing.' });
    }

    // Verify the token
    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token.' });
        }

        // Attach user data to the request object
        req.user = decoded; // decoded contains the JWT payload (userId, etc.)

        // Proceed to the next middleware or route
        next();
    });
};

export default authenticateToken;
