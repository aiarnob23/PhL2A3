import { TFacility } from "./facility.interface";
import { facility } from "./facility.model";


const createFacility = async(payload:TFacility) =>{
    const newFacility = await facility.create(payload);
    return newFacility;
}

export const facilityServices = {
    createFacility,
}