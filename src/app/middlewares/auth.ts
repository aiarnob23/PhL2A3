import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import sendResponse from "../utils/sendResponse";
import { CustomError } from "../errors/customError";

const checAccess = (DesiredRole:string) =>{
    return catchAsync(async(req,res,next)=>{
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if(!token){
            throw new CustomError('You are not authorized', httpStatus.UNAUTHORIZED, [{path:"Authorization", message:"Not valid authorization info!"}]);
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
            res.json({
                success: false,
                statusCode: 401,
                message:"You have no access to this route",
           })
        }
    })
}


export const authCheck = {
    checAccess,
}