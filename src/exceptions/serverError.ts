import { CustomError } from "./customError";

export class ServerError extends CustomError {
  constructor(message: string) {
    super(message, 500);
  }
}
