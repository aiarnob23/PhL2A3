import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { userServices } from "./users.service";
import sendResponse from "../../utils/sendResponse";

// const createUser = catchAsync(async (req,res) =>{
//     const userData =  req.body;
//     console.log(userData);

//     const result = await userServices.createUser(userData);

//     sendResponse(res,{
//         statusCode:httpStatus.OK,
//         success:true,
//         message:'User is created successfully',
//         data:result,
//     })
// })

const createUser = async(req:Request, res:Response) =>{
    try{
        const userData = req.body;
    const result = await userServices.createUser(userData);
    res.send(result);
    }
    catch(error){
        console.log(error);
    }
}

export const userControllers = {
    createUser,
}