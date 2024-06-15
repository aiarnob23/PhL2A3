import { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";


const bookingSchema = new Schema<TBooking>({
    date: {
        type: Date,
        required: true,
      },
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
      user: {
        type: String,
        required: true,
      },
      facility: {
        type: String,
        required: true,
      },
      payableAmount: {
        type: Number,
        required: true,
      },
      isBooked: {
        type: String,
        enum: ['confirmed', 'unconfirmed', 'canceled'],
        default: 'unconfirmed',
        required: true,
      },
})


export const bookings = model<TBooking>('bookings', bookingSchema);