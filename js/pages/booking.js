import { CONFIG } from "../config/config.js";

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

const urlParams = new URLSearchParams(window.location.search);
const preselectServiceId = urlParams.get("id");



// =========================
// AUTO FILL USER
// =========================

if(currentUser){

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
      await fetch(CONFIG.SERVICES_API);

    const services =
      await response.json();


    serviceSelect.innerHTML = `
      <option value="">
        Chọn dịch vụ
      </option>
    `;


    services.forEach(service => {

      const option =
        document.createElement("option");

      option.value =
        service.id;

      option.textContent =
        service.name;

      serviceSelect.appendChild(option);
    });

    // Nếu có id service trên URL, chọn và set giá trị hiển thị
    if (preselectServiceId) {
      const found = services.find(s => String(s.id) === String(preselectServiceId));
      if (found) {
        serviceSelect.value = found.id;
      }
    }

  } catch (error) {

    console.log(
      "Lỗi load services:",
      error
    );
  }
}



// =========================
// LOAD TECHNICIANS
// =========================

async function loadTechnicians() {

  try {

    const response =
      await fetch(CONFIG.TECHNICIANS_API);

    const technicians =
      await response.json();


    technicianSelect.innerHTML = `
      <option value="">
        Chọn kỹ thuật viên
      </option>
    `;


    technicians.forEach(tech => {

      const option =
        document.createElement("option");

      option.value =
        tech.name;

      option.textContent =
        tech.name;

      technicianSelect.appendChild(option);
    });

  } catch (error) {

    console.log(
      "Lỗi load technicians:",
      error
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
      document.getElementById("name").value;

    const phone =
      document.getElementById("phone").value;

    const address =
      document.getElementById("address").value;

    const bookingDate =
      document.getElementById("date").value;

    const note =
      document.getElementById("note").value;



    // VALIDATE

    if(!serviceSelect.value){

      alert("Vui lòng chọn dịch vụ");

      return;
    }

    if(!technicianSelect.value){

      alert("Vui lòng chọn kỹ thuật viên");

      return;
    }



    const bookingData = {

      customerName,

      phone,

      address,

      serviceName:
        serviceSelect.value,

      technicianName:
        technicianSelect.value,

      bookingDate,

      note,

      status:
        "Chờ xác nhận"
    };
    // Gắn `userId` nếu user đã đăng nhập để my-bookings có thể lọc đúng
    if (currentUser && currentUser.id) {
      bookingData.userId = currentUser.id;
    }



    try {

      await createBooking(
        bookingData
      );

      alert(
        "Đặt lịch thành công!"
      );

      // Chuyển sang trang 'Đơn của tôi' để người dùng xem đơn vừa tạo
      window.location.href = "./my-bookings.html";


      bookingForm.reset();



      // AUTO FILL LẠI USER

      if(currentUser){

        document.getElementById("name").value =
          currentUser.name || "";

        document.getElementById("phone").value =
          currentUser.phone || "";
      }


    } catch (error) {

      console.log(error);

      alert(
        "Đặt lịch thất bại!"
      );
    }

});



// =========================
// INIT
// =========================

loadServices();

loadTechnicians();