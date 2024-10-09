"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailController = void 0;
const client_1 = require("@prisma/client");
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const prisma = new client_1.PrismaClient();
const transporter = nodemailer_1.default.createTransport({
    host: config_1.default.smtp_host,
    port: 587,
    secure: false,
    auth: {
        user: config_1.default.smtp_user,
        pass: config_1.default.smtp_password,
    },
});
const sendContractSms = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, message, name } = req.body;
    // Get current date and time in Colombian time zone
    const currentDate = new Date();
    const mailOptions = {
        from: "rayhanalmim1@gmail.com",
        to: "rayhanalmim1@gmail.com",
        subject: `Recive an email from ${email}`,
        text: `hello this is an text email ${name}`,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f4f4f4; padding: 20px; border-radius: 10px;">
            <img src="https://res.cloudinary.com/dvhe6ijiv/image/upload/v1727503766/ehdxdevgtvto0qxxgswk.png" alt="Company Logo" style="width: 100%; height: auto; display: block; margin-bottom: 20px; pointer-events: none;">
            <h1 style="font-weight: bold; color: #3f4754; text-align: center;">New Contact Message</h1>
            <p style="color: #666;"><strong>Sender name:</strong> ${name}</p>
            <p style="color: #666;"><strong>Sender email:</strong> ${email}</p>
            <p style="color: #666;"><strong>Date:</strong> ${currentDate}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
            <p style="color: #666;"><strong>Message:</strong></p>
            <div style="background-color: #ddd; padding: 10px; border-radius: 5px; margin-top: 10px;">
              <p style="color: #333;">${message}</p>
            </div>
            <ul style="color: #666; margin-top: 20px;">
              <li>If you need assistance, feel free to reply to this email or contact us at our support line.</li>
              <li>This is an automated message. Please do not reply directly to this email.</li>
            </ul>
          </div>
        </div>
      `,
    };
    const result = yield transporter.sendMail(mailOptions);
    res.json(result);
}));
exports.EmailController = {
    sendContractSms
};
