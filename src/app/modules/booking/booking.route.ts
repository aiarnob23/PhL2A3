import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { bookingValidationSchema } from "./booking.validation";
import { bookingControllers } from "./booking.controller";


const route = Router();

route.post('/bookings', validateRequest(bookingValidationSchema), bookingControllers.createBooking);
route.get('/bookings', bookingControllers.getBookings);
route.get('/bookings/:id', bookingControllers.getBookings);

export const bookingRoute = route;