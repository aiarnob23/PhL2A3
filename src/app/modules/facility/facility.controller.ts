import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { facilityServices } from "./facility.service";


const createFacility = catchAsync(async (req, res) => {
    const facility = await req.body;
    const result = await facilityServices.createFacility(facility);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Facility added successfully",
        data: result,
    })
})

const updateFacility = catchAsync(async (req, res) => {
    const id = req.params.id;
    const facility = await req.body;
    const result = await facilityServices.updateFacility(id, facility);
       if (result == null) {
         sendResponse(res, {
           success: false,
           statusCode: 404,
           message: "No Data Found",
           data: [],
         });
       } else {
         sendResponse(res, {
           statusCode: httpStatus.OK,
           success: true,
           message: "Facility updated successfully",
           data: result,
         });
       }
})

const deleteFacility = catchAsync(async (req, res) => {
    const result = await facilityServices.deleteFacility(req.params.id);
    if (result == null) {
         sendResponse(res, {
           success: false,
           statusCode: 404,
           message: "No Data Found",
           data: [],
         });
    }
    else{
        sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Deleted successfully",
        data: result,
    })
    }
})

const getAllFacilities = catchAsync(async (req, res) => {
    const result = await facilityServices.getAllFacilities();
      if (!result.length) {
        sendResponse(res, {
          success: false,
          statusCode: 404,
          message: "No Data Found",
          data: [],
        });
      }
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Facilities retrieved successfully",
        data: result,
    })

})


export const facilityControllers = {
    createFacility,
    updateFacility,
    getAllFacilities,
    deleteFacility
}