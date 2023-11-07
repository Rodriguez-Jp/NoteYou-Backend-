import express from "express";
import {
  authenticate,
  register,
  confirmUser,
  resetPassword,
  checkToken,
  setNewPassword,
  profile,
} from "../controllers/userController.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

//Auth, registration and confirmation of users

router.post("/", register); // Creates a new user
router.post("/login", authenticate);
router.get("/confirm/:token", confirmUser);
router.post("/forgot-password/", resetPassword);
router.route("/forgot-password/:token").get(checkToken).post(setNewPassword);
router.get("/profile", checkAuth, profile);

export default router;
