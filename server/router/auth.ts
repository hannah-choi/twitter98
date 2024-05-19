import { Router } from "express";
import * as authController from "../controller/auth";
import { encrypt } from "../middleware/encrypt";

const router = Router();

// POST /register
router.post("/register", encrypt, authController.registerUser);

// POST /login
router.post("/login", authController.loginUser);

// GET /verify
router.get("/verify", authController.verifyUser);

export default router;
