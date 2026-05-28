import { CONFIG } from "../config/config.js";


// GET ALL BOOKINGS
export async function getBookings() {

    const response = await fetch(CONFIG.BOOKINGS_API);

    return await response.json();
}



// CREATE BOOKING
export async function createBooking(data) {

    const response = await fetch(CONFIG.BOOKINGS_API, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(data)
    });

    return await response.json();
}