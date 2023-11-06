import express from "express";
import {
  authenticate,
  register,
  confirmUser,
} from "../controllers/userController.js";

const router = express.Router();

//Auth, registration and confirmation of users

router.post("/", register); // Creates a new user
router.post("/login", authenticate);
router.get("/confirm/:token", confirmUser);

export default router;
