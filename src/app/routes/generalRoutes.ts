import express from 'express';
import { bookingControllers } from '../modules/booking/booking.controller';

const route = express.Router();


route.get('/check-availability', bookingControllers.getAvailableTimeSlots);  

export const generalRoutes = route;