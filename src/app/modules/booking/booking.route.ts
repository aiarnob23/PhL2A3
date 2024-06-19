import { Router } from "express";
import { bookingControllers } from "./booking.controller";
import { authCheck } from "../../middlewares/auth";


const route = Router();



route.post('/', bookingControllers.createBooking);
 route.get('/',bookingControllers.getBookings);
route.get('/:id', bookingControllers.getBookings);
route.delete('/:id',authCheck.checAccess('user'),bookingControllers.cancelBooking);    
                       

export const bookingRoute = route;