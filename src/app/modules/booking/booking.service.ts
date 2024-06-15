import { TBooking } from "./booking.interface";
import { bookings } from "./booking.model";


const createBooking = async (payload: TBooking) => {
    const result = await bookings.create(payload);
    return result;
}

const getAllBookings = async (id: string | null) => {
    if (id) {
        const result = await bookings.findById(id);
        return result;
    }
    else {
        const result = await bookings.find();
        return result;
    }
}

export const bookingServices = {
    createBooking,
    getAllBookings,
}