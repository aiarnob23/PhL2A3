import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path:path.join(process.cwd(),'.env')});

export default {
    port : process.env.PORT,
    DB_URL : process.env.MONGO_URI,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,

}