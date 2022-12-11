import { Router as expressRouter } from "express";
import  generateImage  from "../controllers/openAIController.js";

const router = expressRouter();

router.post('/generateImage', generateImage);

export default router;