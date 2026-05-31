import { CONFIG } from "../config/config.js";

import {
    getCurrentUser
} from "../utils/auth.js";

import {
    showToast
} from "../utils/toast.js";


// =========================
// CHECK ADMIN
// =========================

const user = getCurrentUser();

if (!user || user.role !== "admin") {

    showToast(
        "⛔ Bạn không có quyền truy cập",
        "error"
    );

    setTimeout(() => {

        window.location.href =
            "../index.html";

    }, 1500);
}



// =========================
// ELEMENTS
// =========================

const totalServices =
    document.getElementById("totalServices");

const totalTechnicians =
    document.getElementById("totalTechnicians");

const totalBookings =
    document.getElementById("totalBookings");

const totalUsers =
    document.getElementById("totalUsers");



// =========================
// LOAD DASHBOARD
// =========================

async function loadDashboard() {

    try {

        // SERVICES
        const serviceRes =
            await fetch(CONFIG.SERVICES_API);

        const services =
            await serviceRes.json();

        if (totalServices) {

            totalServices.textContent =
                services.length;
        }



        // TECHNICIANS
        const techRes =
            await fetch(CONFIG.TECHNICIANS_API);

        const technicians =
            await techRes.json();

        if (totalTechnicians) {

            totalTechnicians.textContent =
                technicians.length;
        }



        // BOOKINGS
        const bookingRes =
            await fetch(CONFIG.BOOKINGS_API);

        const bookings =
            await bookingRes.json();

        if (totalBookings) {

            totalBookings.textContent =
                bookings.length;
        }



        // USERS
        const userRes =
            await fetch(CONFIG.USERS_API);

        const users =
            await userRes.json();

        if (totalUsers) {

            totalUsers.textContent =
                users.length;
        }

    }

    catch (error) {

        console.log(
            "Lỗi dashboard:",
            error
        );

        showToast(
            "❌ Không tải được dashboard",
            "error"
        );
    }
}



// =========================
// INIT
// =========================

loadDashboard();