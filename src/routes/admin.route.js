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

adminRouter
    .route("/admin-profile-update/:id")
    .put(adminProfileUpdate);

adminRouter
    .route("/")
    .get(adminsController);
adminRouter
    .route("/:id")
    .delete(deleteAdminController);
adminRouter
    .route("/email-users")
    .post(emailUsersController);

export default adminRouter;
