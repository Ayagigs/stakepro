import express from "express";
import { registerEmail } from "../controller/admin.controller";

const adminRouter = express.Router();

adminRouter.post("/admin-register-email", registerEmail)


export default adminRouter