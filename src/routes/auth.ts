import { Router } from "express";
import { checkJwt } from "../middleware/checkJwt";
import { asyncHandler } from "../middleware/asyncHandler";
import AuthController from "../controllers/AuthController";

const router = Router();

router.post("/assign-token", asyncHandler(AuthController.assignToken));

export default router;
