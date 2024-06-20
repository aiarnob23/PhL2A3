// src/errors/CustomError.ts

export class CustomError extends Error {
  public statusCode: number;
  public errorMessages: { path: string; message: string }[];

  constructor(
    message: string,
    statusCode: number,
    errorMessages: { path: string; message: string }[]
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorMessages = errorMessages;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends CustomError {
  constructor(
    message: string,
    errorMessages: { path: string; message: string }[]
  ) {
    super(message, 400, errorMessages);
  }
}

export class CastError extends CustomError {
  constructor(message: string) {
    super(message, 400, [{ path: "", message }]);
  }
}

export class DuplicateEntryError extends CustomError {
  constructor(
    message: string,
    errorMessages: { path: string; message: string }[]
  ) {
    super(message, 409, errorMessages);
  }
}
