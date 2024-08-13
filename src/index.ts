import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";
import config from "./config";
import routes from "./routes";
import { rateLimiter } from "./middleware/rateLimiter";

const app = express();
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(rateLimiter);

app.use(errorHandler);

app.use("/" + config.prefix, routes);

mongoose
  .connect(config.databaseUri!)
  .then((res) => {
    console.log("connect to database - Initial connection");
    app.listen(config.port, () => {
      console.log(`server is listening on port ${config.port}`);
    });
  })
  .catch((err) => {
    console.log(`Initial database connection error occured: ${err}`);
  });
