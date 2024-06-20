
import catchAsync from "../../utils/catchAsync";
import { userServices } from "./users.service";
import sendResponse from "../../utils/sendResponse";

const createUser = catchAsync(async (req,res) =>{
    const userData =  req.body;

    const tempResult = await userServices.createUser(userData);
    const {password, ... result} = tempResult.toObject();

    sendResponse(res,{
        success:true,
        statusCode:200,
        message: "User registered successfully",
        data:result,
    })
})


export const userControllers = {
    createUser,
}