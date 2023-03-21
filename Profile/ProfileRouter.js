import {Router} from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import ProfileController from "./ProfileController.js";

const router = new Router();

router.post('/add_news', authMiddleware, ProfileController.addNews)
router.delete('/delete_news', authMiddleware, ProfileController.deleteNews)
router.get('/saved-news', authMiddleware, ProfileController.getSavedNews)
export default router