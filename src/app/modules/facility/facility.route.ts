import express from 'express';
import { facilityServices } from './facility.service';
import validateRequest from '../../middlewares/validateRequest';
import { facilityValidationSchema } from './facility.validation';
import { facilityControllers } from './facility.controller';
//import { createFacility, updateFacility, deleteFacility, getAllFacilities } from '../controllers/facility';
// import { auth, isAdmin } from '../middlewares/auth';
// import { validate } from '../middlewares/validate';
// import { facilitySchema } from '../schemas/facility';

const router = express.Router();

//router.post('/', auth, isAdmin, validate(facilitySchema), createFacility);
//router.put('/:id', auth, isAdmin, validate(facilitySchema), updateFacility);
//router.delete('/:id', auth, isAdmin, deleteFacility);
//router.get('/', getAllFacilities);

router.post('/',validateRequest(facilityValidationSchema),facilityControllers.createFacility);
router.put('/:id',validateRequest(facilityValidationSchema),facilityControllers.updateFacility);
router.get('/',facilityControllers.getAllFacilities);
router.delete('/:id',facilityControllers.deleteFacility);

export const facilityRoutes = router;
