import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { bookingValidationSchema } from "./booking.validation";
import { bookingControllers } from "./booking.controller";


const route = Router();

route.post('/bookings', validateRequest(bookingValidationSchema), bookingControllers.createBooking);

export const bookingRoute = route;