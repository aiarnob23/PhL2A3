import cors from 'cors';
import express, { Application, Request, Response, Router } from 'express';
import { userRoutes } from './app/modules/users/users.route';

const app:Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', userRoutes);

app.get('/',(req :Request,res : Response)=>{
    res.send('Server is running...');
})

app.get('/api/auth/test',(req,res)=>{
    res.send('testing ... ...')
})
export default app;