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
import { isAdminLoggedIn } from "../middleware/auth/is-admin-logged-in";
import { hasSuperadminAccess } from "../middleware/auth/superadmin-has-access";

const adminRouter = express.Router();

adminRouter.post("/admin-register-email", registerEmail);
adminRouter.put("/admin-registration-continuation", updateAdminRecord);
adminRouter.patch("/admin-activation/:id", isAdminLoggedIn, hasSuperadminAccess, activateAdmin);
adminRouter.post("/login", adminLogin);
adminRouter.put("/admin-profile-update/:id", isAdminLoggedIn, adminProfileUpdate);
adminRouter.get("/",isAdminLoggedIn, hasSuperadminAccess, adminsController);
adminRouter.delete("/:id", isAdminLoggedIn, hasSuperadminAccess, deleteAdminController);
adminRouter.post("/email-users", isAdminLoggedIn, emailUsersController);

export default adminRouter;
