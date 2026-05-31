import { getServices } from "../api/service.api.js";
import { showToast } from "../utils/toast.js";

const servicesContainer =
  document.querySelector(
    "#servicesContainer"
  );

const renderServices = async () => {

  const services =
    await getServices();

  if (!services?.length) {

    servicesContainer.innerHTML =
      "<h2>Không tìm thấy dịch vụ nào</h2>";

    return;
  }

  servicesContainer.innerHTML =
    services
      .map(
        (service) => `

    <div class="service-card">

      <img
        src="${service.image}"
        alt="${service.name}"
      />

      <div class="service-content">

        <h3>
          ${service.name}
        </h3>

        <p>
          ${service.description}
        </p>

        <h4>
          ${Number(service.price)
            .toLocaleString("vi-VN")} VNĐ
        </h4>

        <button
          class="booking-btn"
          data-id="${service.id}"
        >
          Đặt Lịch
        </button>

      </div>

    </div>

    `
      )
      .join("");
};

renderServices();



// =========================
// BOOKING BUTTON
// =========================

document.addEventListener(
  "click",
  (e) => {

    const btn =
      e.target.closest(
        ".booking-btn"
      );

    if (!btn) return;

    const id =
      btn.dataset.id;

    const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

    if (!user) {

      showToast(
        "⚠️ Vui lòng đăng nhập!",
        "warning"
      );

      setTimeout(() => {

        window.location.href =
          "./login.html";

      }, 1200);

      return;
    }

    window.location.href =
      `./booking.html?id=${id}`;
  }
);