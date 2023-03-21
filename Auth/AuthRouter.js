import {Router} from "express";
import authController from "./authController.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = new Router();

router.post('/registration', authController.registration)
router.post('/login', authController.login)
router.get('/me', authMiddleware, authController.me)
router.get('/users', authController.getUsers)

export default router;