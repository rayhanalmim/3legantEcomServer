"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = '01845fa9e963534a6b29ae6d1bab1de090be158183e262494c2d59b51597bdb7c7ea3073d1c8fbdfcaf7b676305dfd9aedd7aa65cccef4fcaf20d7b9263e7264';
// JWT authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1]; // Bearer <token>
    console.log('from auth header: ', authHeader);
    if (!token) {
        return res.status(401).json({ message: 'Access denied, token missing.' });
    }
    // Verify the token
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
        if (err || !decoded) {
            return res.status(403).json({ message: 'Invalid token.' });
        }
        // Attach user data to the request object
        req.user = decoded; // Cast to the correct type
        console.log(req.user);
        next();
    });
};
exports.default = authenticateToken;
