import { Router } from "express";
import { checkJwt } from "../middleware/checkJwt";
import { asyncHandler } from "../middleware/asyncHandler";
import IoTController from "../controllers/IoTController";

const router = Router();

router.post("/ingest", [checkJwt], asyncHandler(IoTController.ingestData));

export default router;
