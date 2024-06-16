import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./auth.service";


const loginUser = catchAsync(async(req,res)=>{
    const result = await AuthService.loginUser(req.body);
    const {refreshToken, accessToken} = result;
})