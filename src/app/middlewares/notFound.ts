import { NextFunction, Request, Response } from "express";

const notFound = (req:Request, res:Response , next:NextFunction) =>{
    return res.json({
        success: false,
        statusCode:404,
        message:"Not Found!",
    })
}
export default notFound;