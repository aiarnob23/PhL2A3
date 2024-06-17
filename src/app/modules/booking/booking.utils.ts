// Define the time slot type
type TimeSlot = {
    startTime: string,
    endTime: string,
}

// Define total slots
const totalSlots : TimeSlot[] = [
    { startTime: '08:00', endTime: '10:00' },
    { startTime: '10:00', endTime: '12:00' },
    { startTime: '12:00', endTime: '14:00' },
    { startTime: '14:00', endTime: '16:00' },
    { startTime: '16:00', endTime: '18:00' },
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

export const bookingUtils = {
    calcFreeSlot,
};
