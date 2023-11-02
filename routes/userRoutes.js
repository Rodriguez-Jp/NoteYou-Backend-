import express from "express";
import { authenticate, register } from "../controllers/userController.js";

const router = express.Router();

//Auth, registration and confirmation of users

router.post("/", register); // Creates a new user
router.post("/login", authenticate);

export default router;
