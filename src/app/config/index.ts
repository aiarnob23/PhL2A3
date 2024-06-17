import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path:path.join(process.cwd(),'.env')});

export default {
    port : process.env.PORT,
    DB_URL : process.env.MONGO_URI,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt_access_secret: process.env.SCRT1,
    jwt_refresh_secret: process.env.SCRT2,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    NODE_ENV : process.env.NODE_ENV,
}