
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { userServices } from "./users.service";
import sendResponse from "../../utils/sendResponse";

const createUser = catchAsync(async (req,res) =>{
    const userData =  req.body;
    console.log(userData);

    const result = await userServices.createUser(userData);

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'User is created successfully',
        data:result,
    })
})


export const userControllers = {
    createUser,
}