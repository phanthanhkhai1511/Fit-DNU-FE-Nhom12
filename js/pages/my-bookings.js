import { CONFIG } from "../config/config.js";

const user =
  JSON.parse(localStorage.getItem("user"));

const bookingTableBody =
  document.getElementById("bookingTableBody");



// =========================
// KIỂM TRA LOGIN
// =========================

if (!user) {

  alert("Vui lòng đăng nhập!");

  window.location.href =
    "/pages/login.html";
}



// =========================
// LOAD ĐƠN ĐẶT LỊCH
// =========================

async function loadMyBookings() {

  try {

    const response =
      await fetch(CONFIG.BOOKINGS_API);

    const bookings =
      await response.json();



    // LỌC ĐÚNG USER
    const myBookings =
      bookings.filter(booking => {

        // ƯU TIÊN userId
        if (booking.userId) {

          return (
            booking.userId === user.id
          );
        }

        // FALLBACK THEO PHONE
        return (
          booking.phone === user.phone
        );
      });



    // KHÔNG CÓ ĐƠN
    if (myBookings.length === 0) {

      bookingTableBody.innerHTML = `
        <tr>
          <td colspan="5"
              style="text-align:center;">
              
            Bạn chưa có đơn đặt lịch nào

          </td>
        </tr>
      `;

      return;
    }



    // HIỂN THỊ (4 cột phù hợp với header)
    bookingTableBody.innerHTML =
      myBookings.map(booking => `

        <tr>

          <td>
            ${booking.serviceName || ""}
          </td>

          <td>
            ${booking.technicianName || ""}
          </td>

          <td>
            ${booking.bookingDate || ""}
          </td>

          <td>

            <span class="status
              ${booking.status === "Hoàn thành"
                ? "done"
                : booking.status === "Đã xác nhận"
                ? "confirm"
                : "pending"
              }
            ">

              ${booking.status || "Chờ xác nhận"}

            </span>

          </td>

        </tr>

      `).join("");


  } catch (error) {

    console.log(error);

    bookingTableBody.innerHTML = `
      <tr>
        <td colspan="5"
            style="text-align:center;color:red;">
          
          Không thể tải dữ liệu

        </td>
      </tr>
    `;
  }
}



loadMyBookings();

// Auto refresh data every 5 seconds
setInterval(loadMyBookings, 5000);