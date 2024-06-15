import { ErrorRequestHandler } from "express";


const globalErrorHandler :ErrorRequestHandler = (err,req,res,next) =>{
    let statusCode = 50;
    let message = "Something went wrong!";
    

    //ultimate return
    return res.status(statusCode).json({
        success:false,
        message,
        err
    })
}