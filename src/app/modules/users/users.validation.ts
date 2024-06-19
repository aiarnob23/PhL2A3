import { z } from 'zod';

const createUserValidationSchema = z.object({
    body:z.object({
        name: z.string({ invalid_type_error: "Must be string" }).nonempty('Name is required'),
    email: z.string({ invalid_type_error: "Must be string" }).email('Invalid email address'),
    password: z.string({ invalid_type_error: "Must be string" }).min(6, { message: "At least 6 characters required" }),
    phone: z.string({ invalid_type_error: "Must be unique and string format!" }),
    role: z.enum(["admin", "user"], { invalid_type_error: "Must be admin or user role" }),
    address: z.string({ invalid_type_error: "Must be string" }).nonempty('Address is required'),
    })
});

export const userValidation = {
    createUserValidationSchema,
};