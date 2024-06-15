import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
//import {Server} from 'http';

//let server : Server ;

async function main() {
    try{
        await mongoose.connect(config.DB_URL as string);
        app.listen(config.port,()=>{
            console.log(`App is listening on port ${config.port}`);
        })
    }
    catch(error){
        console.log(error);
    }
}
main();