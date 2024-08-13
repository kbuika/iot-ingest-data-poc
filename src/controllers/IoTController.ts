import { Request, Response, NextFunction } from "express";
import iotData, { IIoTData } from "../models/iot-data";

class IoTController {
  static ingestData = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const newData: IIoTData = new iotData(req.body);
      await newData.save();
      res.status(201).send({ message: "Data ingested successfully" });
    } catch (error) {
      res.status(500).send({ message: "Server Error" });
    }
  };
}

export default IoTController;
