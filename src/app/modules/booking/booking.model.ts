import mongoose, { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";
import { facility } from "../facility/facility.model";


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
        required: false,
      },
      facility: {
        type: mongoose.Schema.Types.ObjectId,
        ref:facility,
        required: true,
      },
      payableAmount: {
        type: Number,
        required: false,
      },
      isBooked: {
        type: String,
        enum: ['confirmed', 'unconfirmed', 'canceled'],
        default: 'unconfirmed',
        required: false,
      },
})


export const bookings = model<TBooking>('bookings', bookingSchema);