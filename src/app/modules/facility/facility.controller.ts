import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { facilityServices } from "./facility.service";


const createFacility = catchAsync(async(req,res)=>{
     const facility =await req.body;
     console.log(facility);
    console.log(facility);
    const result = await facilityServices.createFacility(facility);

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Facility is created successfully",
        data:result,
    })
})

const updateFacility = catchAsync(async(req,res)=>{
    const id = req.params.id;
    const facility =await req.body;
   const result = await facilityServices.updateFacility(id,facility);
   sendResponse(res,{
       statusCode:httpStatus.OK,
       success:true,
       message:"Facility updated successfully",
       data:result,
   })
})

const deleteFacility = catchAsync(async(req,res)=>{
    const result = await facilityServices.deleteFacility(req.params.id);

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Deleted successfully",
        data:result,
    })
})

const getAllFacilities = catchAsync(async(req,res)=>{
    const result = await facilityServices.getAllFacilities();
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Facility fetched successfully",
        data:result,
    })
    
})


export const facilityControllers = {
    createFacility,
    updateFacility,
    getAllFacilities,
    deleteFacility
}