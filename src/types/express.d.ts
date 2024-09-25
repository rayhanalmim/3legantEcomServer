import { Request } from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number; // Adjust based on your user object structure
                // Add any other properties of your user object that you might need
                userId: number;
            };
        }
    }
}
