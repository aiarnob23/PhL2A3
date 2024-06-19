import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { facilityValidationSchema } from './facility.validation';
import { facilityControllers } from './facility.controller';
import { authCheck } from '../../middlewares/auth';


const router = express.Router();



router.post('/',validateRequest(facilityValidationSchema),authCheck.checAccess('admin'),facilityControllers.createFacility);
router.put('/:id',validateRequest(facilityValidationSchema),authCheck.checAccess('admin'),facilityControllers.updateFacility);
router.get('/',facilityControllers.getAllFacilities);
router.delete('/:id',authCheck.checAccess('admin'),facilityControllers.deleteFacility);
export const facilityRoutes = router;
