"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiImageRoute = void 0;
const express_1 = __importDefault(require("express"));
const multiImage_controller_1 = require("./multiImage.controller");
// import { PaymentController } from "./payment.controller";
const router = express_1.default.Router();
router.post('/multiImage', multiImage_controller_1.ImageController.uploadMultiImage);
exports.MultiImageRoute = router;
