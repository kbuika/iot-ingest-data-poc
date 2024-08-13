import { Request, Response, NextFunction } from "express";
import { verify, JwtPayload } from "jsonwebtoken";
import config from "../config";

export interface CustomRequest extends Request {
  token: JwtPayload;
}

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers["authorization"];
  let jwtPayload;

  try {
    jwtPayload = <any>verify(token?.split(" ")[1], config.jwt.secret!, {
      complete: true,
      audience: config.jwt.audience,
      issuer: config.jwt.issuer,
      algorithms: ["HS256"],
      clockTolerance: 0,
      ignoreExpiration: false,
      ignoreNotBefore: false,
    });
    (req as CustomRequest).token = jwtPayload;

    // Extract deviceId from the JWT token and the request body
    const tokenDeviceId = jwtPayload.payload.deviceId;
    const requestDeviceId = req.body.deviceId;

    // Compare the deviceId from the JWT token and the request body
    if (tokenDeviceId !== requestDeviceId) {
      return res.status(403).json({ message: "Forbidden: deviceId mismatch" });
    }
  } catch (error) {
    res
      .status(401)
      .type("json")
      .send(JSON.stringify({ message: "Missing or invalid token " }));
    return;
  }

  next();
};
