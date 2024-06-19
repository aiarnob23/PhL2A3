import cors from 'cors';
import express, { Application, Request, Response, Router } from 'express';
import { userRoutes } from './app/modules/users/users.route';
import { facilityRoutes } from './app/modules/facility/facility.route';
import { bookingRoute } from './app/modules/booking/booking.route';
import { authRoutes } from './app/modules/auth/auth.route';
import { generalRoutes } from './app/routes/generalRoutes';

const app:Application = express();

app.use(express.json());
app.use(cors());

app.use('/api', generalRoutes);
app.use('/api/auth', userRoutes, authRoutes);
app.use('/api/facility', facilityRoutes);
app.use('/api/booking', bookingRoute);

app.get('/',(req :Request,res : Response)=>{
    res.send('Server is running...');
})

export default app;