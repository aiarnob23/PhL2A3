// src/middleware/errorHandler.ts

import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/customError";

export const errorHandler = (
  err: CustomError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = {
    success: false,
    message: err.message,
    errorMessages: [{ path: "", message: err.message }],
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  };

  if (err instanceof CustomError) {
    customError = {
      success: false,
      message: err.message,
      errorMessages: err.errorMessages,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    };
  } else if (err.name === "ValidationError") {
    customError = {
      success: false,
      message: "Validation Error",
      errorMessages: Object.values((err as any).errors).map((el: any) => ({
        path: el.path,
        message: el.message,
      })),
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    };
  } else if (err.name === "MongoError" && (err as any).code === 11000) {
    customError = {
      success: false,
      message: "Duplicate Entry",
      errorMessages: [{ path: "", message: err.message }],
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    };
  }

  res.status((err as any).statusCode || 500).json(customError);
};
