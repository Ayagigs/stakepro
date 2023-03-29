import express from "express";
import {
    activateAdmin,
    adminLogin,
    adminProfileUpdate,
    adminsController,
    deleteAdminController,
    emailUsersController,
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

import { isAdminLoggedIn } from "../middleware/auth/is-admin-logged-in";
import { hasSuperadminAccess } from "../middleware/auth/superadmin-has-access";


const adminRouter = express.Router();

adminRouter
    .route("/admin-register-email")
    .post(validatorMiddleware(registerEmailSchema, "body"), isAdminLoggedIn, registerEmail);

adminRouter
    .route("/admin-registration-continuation")
    .put(
        validatorMiddleware(verifyAdminSchema, "query"),
        validatorMiddleware(adminCredentialsSchema, "body"),
        updateAdminRecord
    );

adminRouter
    .route("/admin-activation/:id")
    .patch(validatorMiddleware(activateAdminSchema, "params"), isAdminLoggedIn, hasSuperadminAccess, activateAdmin);

adminRouter
    .route("/login")
    .post(validatorMiddleware(loginSchema, "body"), adminLogin);

adminRouter
    .route("/admin-profile-update/:id")
    .put(isAdminLoggedIn, adminProfileUpdate);

adminRouter
    .route("/")
    .get(isAdminLoggedIn, hasSuperadminAccess, adminsController);
adminRouter
    .route("/:id")
    .delete(isAdminLoggedIn, hasSuperadminAccess, deleteAdminController);
adminRouter
    .route("/email-users")
    .post(isAdminLoggedIn, emailUsersController);

export default adminRouter;
