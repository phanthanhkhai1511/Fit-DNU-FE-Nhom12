import {
  getBookings,
  updateBooking
} from "../api/booking.api.js";

import {
  showToast
} from "../utils/toast.js";

const bookingTableBody =
  document.getElementById(
    "bookingTableBody"
  );



// =========================
// RENDER BOOKINGS
// =========================

async function renderBookings() {

  try {

    const bookings =
      await getBookings();

    bookingTableBody.innerHTML = "";



    // KHÔNG CÓ BOOKING
    if (bookings.length === 0) {

      bookingTableBody.innerHTML = `
        <tr>
          <td colspan="7"
              style="text-align:center;">
              
            Chưa có đơn đặt lịch nào

          </td>
        </tr>
      `;

      return;
    }



    // HIỂN THỊ BOOKINGS
    bookings.forEach((booking) => {

      bookingTableBody.innerHTML += `

        <tr>

          <td>
            ${booking.customerName || ""}
          </td>

          <td>
            ${booking.phone || ""}
          </td>

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

          <td class="actions">

            ${booking.status === "Chờ xác nhận" ? `
              <button
                class="confirm-btn"
                onclick="confirmBooking('${booking.id}')"
              >
                Xác nhận
              </button>
            ` : ""}

            ${booking.status === "Đã xác nhận" ? `
              <button
                class="done-btn"
                onclick="doneBooking('${booking.id}')"
              >
                Hoàn thành
              </button>
            ` : ""}

            ${booking.status === "Hoàn thành" ? `
              <span style="color:#22c55e;font-weight:700;">
                ✓ Đã hoàn thành
              </span>
            ` : ""}

          </td>

        </tr>

      `;
    });

  } catch (error) {

    console.log(error);

    bookingTableBody.innerHTML = `
      <tr>
        <td colspan="7"
            style="text-align:center;color:red;">
          
          Không thể tải dữ liệu

        </td>
      </tr>
    `;

    showToast(
      "❌ Không thể tải dữ liệu",
      "error"
    );
  }
}



// =========================
// XÁC NHẬN BOOKING
// =========================

window.confirmBooking =
  async function (id) {

    try {

      await updateBooking(
        id,
        {
          status: "Đã xác nhận"
        }
      );

      showToast(
        "✅ Đã xác nhận đơn",
        "success"
      );

      renderBookings();

    } catch (error) {

      console.log(error);

      showToast(
        "❌ Lỗi xác nhận đơn",
        "error"
      );
    }
  };



// =========================
// HOÀN THÀNH BOOKING
// =========================

window.doneBooking =
  async function (id) {

    try {

      await updateBooking(
        id,
        {
          status: "Hoàn thành"
        }
      );

      showToast(
        "🎉 Đơn đã hoàn thành",
        "success"
      );

      renderBookings();

    } catch (error) {

      console.log(error);

      showToast(
        "❌ Lỗi cập nhật trạng thái",
        "error"
      );
    }
  };



// =========================
// INIT
// =========================

renderBookings();



// =========================
// AUTO REFRESH
// =========================

setInterval(
  renderBookings,
  5000
);