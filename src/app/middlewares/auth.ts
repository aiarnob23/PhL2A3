import httpStatus from "http-status";
import AppError from "../errors/appErrors";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const checAccess = (DesiredRole:string) =>{
    return catchAsync(async(req,res,next)=>{
        const token = req.headers.authorization;
        if(!token){
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
        }
        const decoded = jwt.verify(
            token,
            config.jwt_access_secret as string,
        ) as JwtPayload;

        const {role} = decoded;

        if(role===DesiredRole){
            next();
        }
        else{
            throw new AppError(httpStatus.FORBIDDEN, 'Forbidden access');
        }
    })
}


export const authCheck = {
    checAccess,
}