import httpStatus from "http-status";
import AppError from "../../errors/appErrors";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../../config";
import { User } from "../users/users.model";

// Define the time slot type
type TimeSlot = {
    startTime: string,
    endTime: string,
}

// Define total slots
const totalSlots : TimeSlot[] = [
    { startTime: '10:00', endTime: '13:00' },
    { startTime: '13:00', endTime: '16:00' },
    { startTime: '16:00', endTime: '19:00' },
    { startTime: '19:00', endTime: '22:00' },
];

// Convert a time string to minutes since midnight for comparison
function timeStringToMinutes(time : string) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}

// Function to get available time slots
async function getAvailableTimeSlots(totalSlots : TimeSlot[], bookingSlots : TimeSlot[]) {
    console.log(totalSlots, ' ', bookingSlots);
    return totalSlots.filter(totalSlot => {
        const totalStart = timeStringToMinutes(totalSlot.startTime);
        const totalEnd = timeStringToMinutes(totalSlot.endTime);

        return !bookingSlots.some(bookingSlot => {
            const bookingStart = timeStringToMinutes(bookingSlot.startTime);
            const bookingEnd = timeStringToMinutes(bookingSlot.endTime);

            return (totalStart < bookingEnd && totalEnd > bookingStart);
        });
    });
}

export const calcFreeSlot = async (bookingData : any) => {
    // Check if bookingData.data exists and is an array
    if (bookingData && Array.isArray(bookingData.data)) {
        const bookingSlots = bookingData.data.map((booking: any) => ({
            startTime: booking.startTime,
            endTime: booking.endTime,
        }));

        // Get available slots
        const availableSlots = await getAvailableTimeSlots(totalSlots, bookingSlots);
        console.log(availableSlots);
        return availableSlots;
    } else {
        // Return an empty array if bookingData.data is not defined or not an array
        return [];
    }
};


//find the user details
export const findUser = async(token: string) =>{
    if(!token){
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
    const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
    ) as JwtPayload;

    const {userEmail} = decoded;
    console.log(userEmail);
    const id = await User.find({email:userEmail},{_id:1});
    return id;
}


export const payableAmountCalculate : any = async (startTime: any, endTime: any) =>{

    const payableAmount = 20 * ((timeStringToMinutes(endTime)-timeStringToMinutes(startTime))/60);
    return payableAmount;

}


export const bookingUtils = {
    calcFreeSlot,
    findUser,
    payableAmountCalculate,
};
