import NewsController from "./NewsController.js";
import {Router} from "express";

const router = new Router();

router.post('/news', NewsController.create)
router.get('/news', NewsController.getRouter)
router.get('/news/:id', NewsController.getOne)
router.put('/news', NewsController.update)
router.delete('/news/:id', NewsController.deleteOne)

export default router