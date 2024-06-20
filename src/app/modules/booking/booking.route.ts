import { Router } from "express";
import { bookingControllers } from "./booking.controller";
import { authCheck } from "../../middlewares/auth";


const route = Router();



route.post('/', bookingControllers.createBooking);
route.get('/user',authCheck.checAccess('user'), bookingControllers.getUserBookings);
route.get('/',authCheck.checAccess('admin'),bookingControllers.getAllBookings);
route.delete('/:id',authCheck.checAccess('user'),bookingControllers.cancelBooking);    
                       

export const bookingRoute = route;