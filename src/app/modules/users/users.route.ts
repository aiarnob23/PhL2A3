import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userControllers } from './users.controllers';
import { userValidation } from './users.validation';


const router = express.Router();

router.post('/signup',
validateRequest(userValidation.createUserValidationSchema),
userControllers.createUser);

export const userRoutes = router;
