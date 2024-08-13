import { Router } from "express";
import iot from "./iot";
import auth from "./auth";

const routes = Router();

routes.use("/iot", iot);
routes.use("/auth", auth);

export default routes;
