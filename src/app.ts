import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { userRoutes } from './app/modules/users/users.route';
import { facilityRoutes } from './app/modules/facility/facility.route';
import { bookingRoute } from './app/modules/booking/booking.route';
import { authRoutes } from './app/modules/auth/auth.route';
import { generalRoutes } from './app/routes/generalRoutes';
import notFound from './app/middlewares/notFound';
import { errorHandler } from './app/middlewares/errorHandler';
import globalErrorHandler from './app/errors/globalErrorhandler';

const app:Application = express();

app.use(express.json());
app.use(cors());

app.use('/api', generalRoutes);
app.use('/api/auth', userRoutes, authRoutes);
app.use('/api/facility', facilityRoutes);
app.use('/api/bookings', bookingRoute);

app.get('/',(req :Request,res : Response)=>{
    res.send('Sports Facility Booking Platform server is running properly');
})


app.use(notFound);
app.use(globalErrorHandler);
app.use(errorHandler);

export default app;