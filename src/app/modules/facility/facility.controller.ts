import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { facilityServices } from "./facility.service";


const createFacility = catchAsync(async(req,res)=>{
    const facility = req.body;
    console.log(facility);
    const result = await facilityServices.createFacility(facility);

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Facility is created successfully",
        data:result,
    })
})

export const facilityControllers = {
    createFacility,
}