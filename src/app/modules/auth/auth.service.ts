import httpStatus from "http-status";
import AppError from "../../errors/appErrors";
import { TLoginUser } from "./auth.interface";
import { User } from "../users/users.model";
import { createToken } from "./auth.utils";
import config from "../../config";



const loginUser = async(payload:TLoginUser) => {
    //checking if the user is exists
     const userData = await User.isUserExistsByEmail(payload.email);

    if(!userData){
        throw new AppError(httpStatus.NOT_FOUND,'This user is not found!');
    }

//checking if the password is correct
if(!(await User.isPasswordMatched(payload?.password, userData?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched!');

//create token and sent to the client
const jwtPayload = {
    userEmail: userData.email,
    role:userData.role,
}

const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
)

const refreshToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
)


return{
    accessToken,
    refreshToken,
}   
}

export const AuthService = {
    loginUser,
}