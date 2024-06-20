import { z } from 'zod';

export const facilityValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        pricePerHour: z.number({required_error:'price is required'}).positive(),
        location: z.string().min(1)
    })
});
