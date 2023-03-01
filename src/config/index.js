import { config } from "dotenv";
import { connect, set } from "mongoose";
import logger from "../utils/logger";
 
config();



export async function connectDB() {
    try {
        set("strictQuery", false);
        console.log(process.env.MONGODB_URI)
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

export const {
    MONGODB_URI,
    ACCESS_TOKEN,
    MAIL_SERVICE,
    MAIL_PASS,
    MAIL_USER,
    WEB_URL,
} = process.env;