import express from "express";
import { registerEmail, updateAdminRecord } from "../controller/admin.controller";

const adminRouter = express.Router();

adminRouter.post("/admin-register-email", registerEmail)
adminRouter.put("/admin-registration-continuation", updateAdminRecord)


export default adminRouter