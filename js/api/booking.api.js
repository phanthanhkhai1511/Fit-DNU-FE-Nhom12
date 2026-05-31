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


// UPDATE BOOKING
export async function updateBooking(id, data) {
    try {
        const response = await fetch(`${CONFIG.BOOKINGS_API}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        return await response.json();
    } catch (error) {
        console.error("Lỗi updateBooking:", error);
        throw error;
    }
}

// DELETE BOOKING
export async function deleteBooking(id) {
    try {
        await fetch(`${CONFIG.BOOKINGS_API}/${id}`, { method: "DELETE" });
    } catch (error) {
        console.error("Lỗi deleteBooking:", error);
        throw error;
    }
}