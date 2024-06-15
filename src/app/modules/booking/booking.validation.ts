import { z } from "zod";

export const bookingValidationSchema = z.object({
    body: z.object({
        date: z.date(),
        startTime: z.string(),
        endTime: z.string(),
        user: z.string(),
        facility: z.string(),
        payableAmount: z.number(),
        isBooked: z.enum(['confirmed', 'unconfirmed', 'canceled']),
    })
});

//there will be two part
//user info will be extracted from token
