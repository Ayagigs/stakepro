import express from "express";
import {
    activateAdmin,
    adminLogin,
    registerEmail,
    updateAdminRecord,
} from "../controller/admin.controller";
import validatorMiddleware from "../middleware/validator.middleware";
import {
    registerEmailSchema,
    adminCredentialsSchema,
    verifyAdminSchema,
    loginSchema,
    activateAdminSchema
} from "../validator_schema/adminAuthSchema";
const adminRouter = express.Router();

adminRouter
    .route("/admin-register-email")
    .post(validatorMiddleware(registerEmailSchema, "body"), registerEmail);

adminRouter
    .route("/admin-registration-continuation")
    .put(
        validatorMiddleware(verifyAdminSchema, "query"),
        validatorMiddleware(adminCredentialsSchema, "body"),
        updateAdminRecord
    );

adminRouter
    .route("/admin-activation/:id")
    .patch(validatorMiddleware(activateAdminSchema, "params"), activateAdmin);

adminRouter
    .route("/login")
    .post(validatorMiddleware(loginSchema, "body"), adminLogin);

export default adminRouter;
