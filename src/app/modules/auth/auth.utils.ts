import jwt from 'jsonwebtoken';


export const createToken = (
    jwtPayload : {userEmail:String , role:String},
    secret:string,
    expiresIn:string
) => {
    return jwt.sign(jwtPayload, secret, {expiresIn})
}

