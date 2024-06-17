// Define the time slot type
type TimeSlot = {
    startTime: string,
    endTime: string,
}

// Convert a time string to minutes since midnight for comparison
function timeStringToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}

// Function to get available time slots
function getAvailableTimeSlots(totalSlots, bookingSlots) {
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

// Define total slots
const totalSlots = [
    { startTime: '08:00', endTime: '10:00' },
    { startTime: '10:00', endTime: '12:00' },
    { startTime: '12:00', endTime: '14:00' },
    { startTime: '14:00', endTime: '16:00' },
    { startTime: '16:00', endTime: '18:00' },
];

// Define booking slots
const bookingSlots = [
    { startTime: '10:00', endTime: '12:00' },
    { startTime: '14:00', endTime: '16:00' },
];

// Get available slots
const availableSlots = getAvailableTimeSlots(totalSlots, bookingSlots);
console.log(availableSlots);
