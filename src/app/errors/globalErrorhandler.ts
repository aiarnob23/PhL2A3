import { ErrorRequestHandler } from "express";
import { TErrorSources } from "./errorInterface";
import { ZodError } from "zod";
import handleZodError from "./handleZodErrors";


const globalErrorHandler : ErrorRequestHandler = (err, req, res, next) => {
    let statusCode=500;
    let message = 'Something went wrong!';
    let errorSource: TErrorSources = [
        {
            path: '',
            message: 'Something went wrong!',
        }
    ];

    if (err instanceof ZodError) {
      const simplifiedError = handleZodError(err);
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message;
      errorSource = simplifiedError?.errorSources;
    }

    else if (err instanceof Error) {
        message= err.message,
            errorSource = [{
                path: '',
                message: err?.message,
            }]
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errorSource,
        err,
        stack:message,
    })
}

export default globalErrorHandler;