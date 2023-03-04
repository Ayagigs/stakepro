import express from "express";
import { activateAdmin, adminLogin, registerEmail, updateAdminRecord } from "../controller/admin.controller";

const adminRouter = express.Router();

adminRouter.post("/admin-register-email", registerEmail)
adminRouter.put("/admin-registration-continuation", updateAdminRecord)
adminRouter.put("/admin-activation/:id", activateAdmin)
adminRouter.post("/login", adminLogin)


export default adminRouter