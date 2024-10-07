import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  port: process.env.PORT,
  smtp_host: process.env.SMTP_HOST,
  smtp_port: process.env.SMTP_PORT,
  smtp_user: process.env.SMTP_USER,
  smtp_password: process.env.SMTP_PASSWORD,
  aws_access_key: process.env.AWA_ACCESS_KEY ,
  aws_secret_key: process.env.AWS_SECRET_KEY,
  aws_region : process.env.AWS_REGION
};