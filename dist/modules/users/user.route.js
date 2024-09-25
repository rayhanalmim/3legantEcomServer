"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_service_1 = require("./user.service");
const router = express_1.default.Router();
router.post("/create-user", user_service_1.UserServices.Registration);
router.post("/log-in", user_service_1.UserServices.LogIn);
exports.UserRoute = router;
