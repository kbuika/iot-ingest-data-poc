import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import config from "../config";

class AuthController {
  static assignToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { deviceId } = req.body;
      // the token never expires
      const token = sign(
        {
          deviceId: deviceId.toString(),
          role: "iot",
        },
        config.jwt.secret!,
        {
          algorithm: "HS256",
          audience: config.jwt.audience,
          issuer: config.jwt.issuer,
        }
      );
      res.status(201).send({ token });
    } catch (error) {
      res.status(500).send({ message: "Server Error" });
    }
  };
}
export default AuthController;
