import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { bookingValidationSchema } from "./booking.validation";
import { bookingControllers } from "./booking.controller";
import { authCheck } from "../../middlewares/auth";


const route = Router();

route.post('/bookings', bookingControllers.createBooking);
//route.post('/bookings', bookingControllers.createBooking);
route.get('/bookings', authCheck.checAccess('admin'), bookingControllers.getBookings);
route.get('/bookings/:id',authCheck.checAccess('user'), bookingControllers.getBookings);
route.get('/booking/available',bookingControllers.getAvailableTimeSlots);

export const bookingRoute = route;