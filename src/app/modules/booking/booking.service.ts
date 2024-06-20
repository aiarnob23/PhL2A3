
import { TBooking } from "./booking.interface";
import { bookings } from "./booking.model";
import { calcFreeSlot } from "./booking.utils";

const createBooking = async (payload: TBooking) => {
  const result = await bookings.create(payload);
  return result;
};

const getUserBookings = async (id: String) => {
  const result = await bookings.find({ user: id }).populate("facility");
  return result;
};

const getAllBookings = async () => {
  const result = await bookings.find().populate("facility");
  return result;
};

const getAvailableTimeSlots = async (queryDate: any) => {
  try {
    if (queryDate === null) {
      const date = new Date();
      date.setUTCHours(0, 0, 0, 0);
      let isoSTring = date.toISOString();
      queryDate = isoSTring.replace("Z", "+00:00");
    } else {
      const date = new Date(queryDate);
      queryDate = date.setUTCHours(0, 0, 0, 0);
    }
    const bookedTimeSlots = await bookings.find({ date: queryDate });
    console.log(bookedTimeSlots);
    const result = await calcFreeSlot({ data: bookedTimeSlots });
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error in getAvailableTimeSlots:", error);
    throw error;
  }
};

const deleteBooking = async (bookingId: string) => {
  await bookings.findByIdAndUpdate(bookingId, { isBooked: "canceled" });
  const result = await bookings.findByIdAndDelete(bookingId).populate("facility");
  return result;
};

export const bookingServices = {
  createBooking,
  getAllBookings,
  getAvailableTimeSlots,
  deleteBooking,
  getUserBookings,
};
