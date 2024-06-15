import { AnyZodObject } from "zod";
import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";



const validateRequest = (schema : AnyZodObject) =>{
    return catchAsync(async(req, res, next)=>{
        await schema.parseAsync({
            body:req.body,
        })
        next();
    })
}


// const validateRequest = (schema: AnyZodObject) =>{
//     return async(req :Request,res:Response,next:NextFunction) =>{
//         await schema.parseAsync({
//             body:req.body,
//         })
//         next();
//     }
// }


export default validateRequest;