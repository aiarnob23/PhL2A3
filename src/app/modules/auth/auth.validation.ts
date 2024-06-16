import {z} from 'zod';

const loginValidationSchema = z.object({
    body:z.object({
        email:z.string(),
       password:z.string(),
    })
})

export const authValidation = {
    loginValidationSchema,
}