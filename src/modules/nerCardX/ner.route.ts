import express from "express";
import { NerController } from "./ner.controller";
// import { EmailController } from "./email.controller";
// import { ProductsController } from "./product.service";
const router = express.Router();

router.post("/extract-data", NerController.extractData);

export const NerRoute = router;