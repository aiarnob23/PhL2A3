import bycript from 'bcrypt'
import { model, Schema } from 'mongoose'
import { TUser } from './users.interface'
import config from '../../config'

const userSchema = new Schema<TUser>({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
        unique:true,
    },
    role:{
        type:String,
        enum:['admin', 'user'],
    },
    address:{
        type:String,
        required:true,
    }
})

userSchema.pre('save', async function(next){
    const user = this;
     
    user.password = await bycript.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),
    )
    next();
})

export const User = model<TUser>('User', userSchema);