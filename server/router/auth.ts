import { Router } from "express";
import * as authController from "../controller/auth";
import { validate } from "../middleware/validator";
import { body } from "express-validator";
import { authenticate } from "../middleware/authenticator";

const router = Router();

const validateEssential = [
    body("username").trim().isLength({ min: 3, max: 12 }).withMessage("Username should be minimum 5 characters"),
    body("password").trim().isLength({ min: 8, max: 16 }).withMessage("Password should be at least 8 characters"),
    validate
];

const validateRegister = [
    ...validateEssential,
    body("nickname").trim().isLength({ min: 3 }).withMessage("Username should be minimum 5 characters"),
    body("email").trim().isEmail().normalizeEmail().withMessage("Invalid email address"),
    validate
];

// POST /register
router.post("/register", validateRegister, authController.registerUser);

// POST /login
router.post("/login", validateEssential, authController.loginUser);

// GET /verify
router.get("/verify", authenticate, authController.verifyUser);

export default router;
