import { TBooking } from "./booking.interface";
import { bookings } from "./booking.model";
import { calcFreeSlot } from "./booking.utils";

const createBooking = async (payload: TBooking) => {
    const result = await bookings.create(payload);
    return result;
};

const getAllBookings = async (id: string | null) => {
    if (id) {
        const result = await bookings.findById(id);
        return result;
    } else {
        const result = await bookings.find();
        return result;
    }
};

const getAvailableTimeSlots = async () => {
    try {
        const bookedTimeSlots = await bookings.find();
        console.log(bookedTimeSlots);
        const result = await calcFreeSlot({ data: bookedTimeSlots });
        console.log(result);
        return result;
    } catch (error) {
        console.error("Error in getAvailableTimeSlots:", error);
        throw error;
    }
};

const deleteBooking = async(bookingId : string) =>{
    const result = await bookings.findByIdAndDelete(bookingId);
    return result;
}

export const bookingServices = {
    createBooking,
    getAllBookings,
    getAvailableTimeSlots,
    deleteBooking,
};
