import bcript from 'bcrypt'
import { model, Schema } from 'mongoose'
import { TUser, UserModel } from './users.interface'
import config from '../../config'

const userSchema = new Schema<TUser, UserModel>({
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
        select:false,
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
     
    user.password = await bcript.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),
    )
    next();
})


userSchema.statics.isUserExistsByEmail = async function(email:string) {
    return await User.findOne({email}).select('+password');
}

userSchema.statics.isPasswordMatched = async function(plainTextPassword, hashedPassword){
    return await bcript.compare(plainTextPassword,hashedPassword);
}

export const User = model<TUser, UserModel>('User', userSchema);