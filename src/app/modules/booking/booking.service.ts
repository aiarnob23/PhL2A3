import { TBooking } from "./booking.interface";
import { bookings } from "./booking.model";
import { calcFreeSlot } from "./booking.utils";

const createBooking = async (payload: TBooking) => {
    const result = await bookings.create(payload);
    return result;
};

const getAllBookings = async (id: String | null) => {
    if (id) {
        const result = await bookings.findById(id);
        return result;
    } else {
        const result = await bookings.find();
        return result;
    }
};


const getAvailableTimeSlots = async (queryDate : any) => {
    try {

        if(queryDate === null){
            const date = new Date();
            date.setUTCHours(0,0,0,0);
            let isoSTring = date.toISOString();
             queryDate = isoSTring.replace('Z', '+00:00');
        }
        else{
            const date = new Date(queryDate);
             queryDate = date.setUTCHours(0,0,0,0);
        }
        const bookedTimeSlots = await bookings.find({date:queryDate});
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
