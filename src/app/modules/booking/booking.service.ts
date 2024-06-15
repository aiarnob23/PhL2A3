import { TBooking } from "./booking.interface";
import { bookings } from "./booking.model";


const createBooking = async(payload:TBooking) =>{
    const result = await bookings.create(payload);
    return result;
}

export const bookingServices = {
    createBooking,
}