import { CONFIG } from "../config/config.js";
import { showToast } from "../utils/toast.js";

const user =
  JSON.parse(localStorage.getItem("user"));

const bookingTableBody =
  document.getElementById("bookingTableBody");

// =========================
// KIỂM TRA LOGIN
// =========================

if (!user) {

  showToast(
    "Vui lòng đăng nhập!",
    "error"
  );

  setTimeout(() => {

    window.location.href =
      "/pages/login.html";

  }, 1500);
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

    const myBookings =
      bookings.filter(booking => {

        if (booking.userId) {

          return (
            booking.userId === user.id
          );
        }

        return (
          booking.phone === user.phone
        );
      });

    if (myBookings.length === 0) {

      bookingTableBody.innerHTML = `
        <tr>
          <td colspan="5"
              style="
                text-align:center;
                padding:30px;
                color:#6b7280;
                font-weight:600;
              ">
            Bạn chưa có đơn đặt lịch nào
          </td>
        </tr>
      `;

      return;
    }

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

    showToast(
      "Không thể tải dữ liệu",
      "error"
    );

    bookingTableBody.innerHTML = `
      <tr>
        <td colspan="5"
            style="
              text-align:center;
              color:red;
              padding:30px;
            ">
          Không thể tải dữ liệu
        </td>
      </tr>
    `;
  }
}

loadMyBookings();

// Auto refresh
setInterval(
  loadMyBookings,
  5000
);