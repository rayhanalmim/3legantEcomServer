"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NerRoute = void 0;
const express_1 = __importDefault(require("express"));
const ner_controller_1 = require("./ner.controller");
// import { EmailController } from "./email.controller";
// import { ProductsController } from "./product.service";
const router = express_1.default.Router();
router.post("/extract-data", ner_controller_1.NerController.extractData);
exports.NerRoute = router;
