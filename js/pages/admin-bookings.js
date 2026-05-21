import {
  checkAdmin
}
from "../utils/auth.js";

checkAdmin();


import {

  getBookings,

  deleteBooking,

  updateBookingStatus,

} from "../api/booking.api.js";

const bookingTableBody =
  document.querySelector(
    "#bookingTableBody"
  );

const renderBookings =
  async () => {

    const bookings =
      await getBookings();

    bookingTableBody.innerHTML =
      bookings
        .map(
          (booking) => `
      
      <tr>

        <td>
          ${booking.customerName}
        </td>

        <td>
          ${booking.phone}
        </td>

        <td>
          ${booking.serviceName}
        </td>

        <td>
          ${booking.technicianName}
        </td>

        <td>
          ${booking.bookingDate}
        </td>

        <td>
          ${booking.status}
        </td>

        <td>

          <button
            class="status-btn"
            onclick="handleStatus('${booking.id}')"
          >
            Xác nhận
          </button>

          <button
            class="delete-btn"
            onclick="handleDelete('${booking.id}')"
          >
            Xóa
          </button>

        </td>

      </tr>
      
      `
        )
        .join("");
};

window.handleDelete =
  async (id) => {

    const confirmDelete =
      confirm(
        "Bạn có chắc muốn xóa?"
      );

    if (!confirmDelete) return;

    await deleteBooking(id);

    renderBookings();
};

window.handleStatus =
  async (id) => {

    await updateBookingStatus(
      id,
      "confirmed"
    );

    renderBookings();
};

renderBookings();