"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailRoute = void 0;
const express_1 = __importDefault(require("express"));
const email_controller_1 = require("./email.controller");
// import { ProductsController } from "./product.service";
const router = express_1.default.Router();
router.post("/contract-sms-send", email_controller_1.EmailController.sendContractSms);
exports.EmailRoute = router;
