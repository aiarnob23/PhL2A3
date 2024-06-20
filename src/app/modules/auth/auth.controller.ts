
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";


const loginUser = catchAsync(async (req, res) => {
    const {userData, refreshToken} = await AuthService.loginUser(req.body);

    res.cookie('refreshToken', refreshToken), {
        secure: true,
        httpOnly: true,
    }

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User logged in successfully",
        data: userData
    })
})


export const AuthControllers = {
    loginUser,
}