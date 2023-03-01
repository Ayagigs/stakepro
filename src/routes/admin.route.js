import express from "express";
import { registerEmail } from "../controller/admin.controller";

const adminRoute = express.Router();

adminRoute.post("/admin-register-email", registerEmail)