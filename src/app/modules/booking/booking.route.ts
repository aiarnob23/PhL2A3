import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { bookingValidationSchema } from "./booking.validation";
import { bookingControllers } from "./booking.controller";
import { authCheck } from "../../middlewares/auth";


const route = Router();

route.post('/bookings', validateRequest(bookingValidationSchema), bookingControllers.createBooking);
route.get('/bookings', authCheck.checAccess('admin'), bookingControllers.getBookings);
route.get('/bookings/:id',authCheck.checAccess('user'), bookingControllers.getBookings);

export const bookingRoute = route;