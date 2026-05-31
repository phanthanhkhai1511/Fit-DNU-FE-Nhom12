import { CONFIG } from "../config/config.js";
import { showToast } from "../utils/toast.js";

import {
  createBooking
} from "../api/booking.api.js";

import {
  getCurrentUser
} from "../utils/auth.js";

const serviceSelect =
  document.getElementById("service");

const technicianSelect =
  document.getElementById("technician");

const bookingForm =
  document.getElementById("bookingForm");

const currentUser =
  getCurrentUser();

const urlParams =
  new URLSearchParams(
    window.location.search
  );

const preselectServiceId =
  urlParams.get("id");

// =========================
// AUTO FILL USER
// =========================

if (currentUser) {

  document.getElementById("name").value =
    currentUser.name || "";

  document.getElementById("phone").value =
    currentUser.phone || "";
}

// =========================
// LOAD SERVICES
// =========================

async function loadServices() {

  try {

    const response =
      await fetch(
        CONFIG.SERVICES_API
      );

    const services =
      await response.json();

    serviceSelect.innerHTML = `
      <option value="">
        Chọn dịch vụ
      </option>
    `;

    services.forEach(service => {

      const option =
        document.createElement(
          "option"
        );

      option.value =
        service.id;

      option.textContent =
        service.name;

      serviceSelect.appendChild(
        option
      );
    });

    if (preselectServiceId) {

      const found =
        services.find(
          s =>
            String(s.id) ===
            String(preselectServiceId)
        );

      if (found) {

        serviceSelect.value =
          found.id;
      }
    }

  } catch (error) {

    console.log(
      "Lỗi load services:",
      error
    );

    showToast(
      "Không tải được danh sách dịch vụ",
      "error"
    );
  }
}

// =========================
// LOAD TECHNICIANS
// =========================

async function loadTechnicians() {

  try {

    const response =
      await fetch(
        CONFIG.TECHNICIANS_API
      );

    const technicians =
      await response.json();

    technicianSelect.innerHTML = `
      <option value="">
        Chọn kỹ thuật viên
      </option>
    `;

    technicians.forEach(tech => {

      const option =
        document.createElement(
          "option"
        );

      option.value =
        tech.name;

      option.textContent =
        tech.name;

      technicianSelect.appendChild(
        option
      );
    });

  } catch (error) {

    console.log(
      "Lỗi load technicians:",
      error
    );

    showToast(
      "Không tải được danh sách kỹ thuật viên",
      "error"
    );
  }
}

// =========================
// SUBMIT BOOKING
// =========================

bookingForm.addEventListener(
  "submit",

  async (e) => {

    e.preventDefault();

    const customerName =
      document.getElementById(
        "name"
      ).value;

    const phone =
      document.getElementById(
        "phone"
      ).value;

    const address =
      document.getElementById(
        "address"
      ).value;

    const bookingDate =
      document.getElementById(
        "date"
      ).value;

    const note =
      document.getElementById(
        "note"
      ).value;

    if (!serviceSelect.value) {

      showToast(
        "Vui lòng chọn dịch vụ",
        "error"
      );

      return;
    }

    if (!technicianSelect.value) {

      showToast(
        "Vui lòng chọn kỹ thuật viên",
        "error"
      );

      return;
    }

    const bookingData = {

  customerName,

  phone,

  address,

  serviceName:
    serviceSelect.options[
      serviceSelect.selectedIndex
    ].text,

  technicianName:
    technicianSelect.value,

  bookingDate,

  note,

  status:
    "Chờ xác nhận"
};

    if (
      currentUser &&
      currentUser.id
    ) {

      bookingData.userId =
        currentUser.id;
    }

    try {

      await createBooking(
        bookingData
      );

      showToast(
        "Đặt lịch thành công!",
        "success"
      );

      setTimeout(() => {

        window.location.href =
          "./my-bookings.html";

      }, 1200);

      bookingForm.reset();

      if (currentUser) {

        document.getElementById(
          "name"
        ).value =
          currentUser.name || "";

        document.getElementById(
          "phone"
        ).value =
          currentUser.phone || "";
      }

    } catch (error) {

      console.log(error);

      showToast(
        "Đặt lịch thất bại!",
        "error"
      );
    }
  }
);

// =========================
// INIT
// =========================

loadServices();

loadTechnicians();