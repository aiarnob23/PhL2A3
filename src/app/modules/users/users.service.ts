import { TUser } from "./users.interface";
import { User } from "./users.model";


const createUser = async(payload:TUser) =>{
    const newUser = await User.create(payload);
    console.log('service... ', newUser);
    return newUser;
}

export const userServices = {
    createUser,
}

