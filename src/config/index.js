import { config } from "dotenv";
import { connect, set } from "mongoose";
import logger from "../utils/logger";
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { v2 as cloudinary } from "cloudinary"
import Nexmo from "nexmo"
config();



export async function connectDB() {
    try {
        set("strictQuery", false);
        await connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger.info(
            "▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎"
        );
        logger.info(`▼                                   ▼`);
        logger.info(`▼ 🛢  🅳🅰🆃🅰🅱🅰🆂🅴 🅲🅾🅽🅽🅴🅲🆃🅴🅳             ▼`);
        logger.info(`▼                                   ▼`);
        logger.info(
            "▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎"
        );
    } catch (err) {
        if (err instanceof Error) logger.error(err.message);
    }
};

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    allowedFormats: ['jpg', 'jpeg', 'png', 'gif'],
});

const parser = multer({ storage: storage });

const nexmo = new Nexmo({
    apiKey: process.env.NEXMO_KEY,
    apiSecret: process.env.NEXMO_SECRET,
  });
  
export {cloudinary, parser as fileParser, nexmo }

export const {
    MONGODB_URI,
    ACCESS_TOKEN,
    MAIL_SERVICE,
    MAIL_PASS,
    MAIL_USER,
    WEB_URL,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    IPINFO_TOKEN,
    PORT
} = process.env;