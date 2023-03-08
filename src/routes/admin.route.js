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

const adminRouter = express.Router();

adminRouter.post("/admin-register-email", registerEmail);
adminRouter.put("/admin-registration-continuation", updateAdminRecord);
adminRouter.patch("/admin-activation/:id", activateAdmin);
adminRouter.post("/login", adminLogin);
adminRouter.put("/admin-profile-update/:id", adminProfileUpdate);
adminRouter.get("/", adminsController);
adminRouter.delete("/:id", deleteAdminController);
adminRouter.post("/email-users", emailUsersController);

export default adminRouter;
