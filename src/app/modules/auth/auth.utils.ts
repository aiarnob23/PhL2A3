import jwt from 'jsonwebtoken';


export const createToken = (
    jwtPayload : {userEmail:String , role:String},
    secret:string,
    expiresIn:string
) => {
    let token= jwt.sign(jwtPayload, secret, {expiresIn})
    return `Bearer ${token}`;
}

