
import { TFacility } from "./facility.interface";
import { facility } from "./facility.model";


const createFacility = async(payload:TFacility) =>{
    const newFacility = await facility.create(payload);
    console.log('service... ', newFacility);
    return newFacility;
}

const updateFacility = async(id:string, payload:TFacility) =>{
    const result = await facility.findOneAndUpdate({_id:id}, payload);
    return result;
}

const getAllFacilities = async()=>{
    const result = await facility.find({isDeleted:false});
    return result;
}

const deleteFacility = async(id:string)=>{
    const result = await facility.findByIdAndUpdate(id, {isDeleted:true}, {new:true} );
    console.log(result);
    return result;
}


export const facilityServices = {
    createFacility,
    updateFacility,
    getAllFacilities,
    deleteFacility,
}