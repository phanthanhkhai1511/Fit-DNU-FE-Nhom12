import {
  logout,
  getCurrentUser
} from "../utils/auth.js";

const navList =
  document.querySelector("#navList");

const user =
  getCurrentUser();


// =========================
// CHƯA LOGIN
// =========================

if (!user) {

  navList.innerHTML = `

    <li>
      <a href="/pages/services.html">
        Services
      </a>
    </li>

    <li>
      <a href="/pages/technicians.html">
        Technicians
      </a>
    </li>

    <li>
      <a href="/pages/login.html">
        Login
      </a>
    </li>

    <li>
      <a href="/pages/register.html">
        Register
      </a>
    </li>

  `;
}


// =========================
// ĐÃ LOGIN
// =========================

else {

  navList.innerHTML = `

    <!-- USER INFO -->
    <li class="welcome-text">
      Xin chào, ${user.name}
    </li>


    <!-- USER MENU -->
    <li>
      <a href="/pages/services.html">
        Services
      </a>
    </li>

    <li>
      <a href="/pages/technicians.html">
        Technicians
      </a>
    </li>

    <li>
      <a href="/pages/booking.html">
        Đặt Lịch
      </a>
    </li>

    <li>
      <a href="/pages/my-bookings.html">
        Đơn Của Tôi
      </a>
    </li>


    <!-- ADMIN MENU -->
    ${
      user.role === "admin"

      ?

      `

      <li>
        <a href="/admin/dashboard.html">
          Dashboard
        </a>
      </li>

      <li>
        <a href="/admin/services.html">
          Quản lý dịch vụ
        </a>
      </li>

      <li>
        <a href="/admin/technicians.html">
          Kỹ thuật viên
        </a>
      </li>

      <li>
        <a href="/admin/bookings.html">
          Đơn đặt lịch
        </a>
      </li>

      `

      :

      ""
    }


    <!-- LOGOUT -->
    <li>

      <button
        class="logout-btn"
        id="logoutBtn"
      >
        Logout
      </button>

    </li>

  `;

  const logoutBtn =
    document.querySelector("#logoutBtn");

  logoutBtn.addEventListener(
    "click",
    logout
  );
}