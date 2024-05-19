import { Router } from "express";
import * as authController from "../controller/auth";

const router = Router();

// POST /register
router.post("/register", authController.registerUser);

// POST /login
router.post("/login", authController.loginUser);

// GET /verify
router.get("/verify", authController.verifyUser);

export default router;
