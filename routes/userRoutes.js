import express from "express";
import { register } from "../controllers/userController.js";

const router = express.Router();

//Auth, registration and confirmation of users

router.post("/", register); // Creates a new user

export default router;