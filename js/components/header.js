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
        Dịch vụ
      </a>
    </li>

    <li>
      <a href="/pages/technicians.html">
        Kỹ thuật viên
      </a>
    </li>

    <li>
      <a href="/pages/login.html">
        Đăng nhập
      </a>
    </li>

    <li>
      <a href="/pages/register.html">
        Đăng ký
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
        Dịch vụ
      </a>
    </li>

    <li>
      <a href="/pages/technicians.html">
        Kỹ thuật viên
      </a>
    </li>

    <li>
      <a href="/pages/booking.html">
        Đặt lịch
      </a>
    </li>

    <li>
      <a href="/pages/my-bookings.html">
        Đơn của tôi
      </a>
    </li>


    <!-- ADMIN MENU -->
    ${
      user.role === "admin"

      ?

      `

      <li>
        <a href="/admin/dashboard.html">
          Bảng điều khiển
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
        Đăng xuất
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

// =========================
// HEADER SCROLL EFFECT
// =========================

const header =
  document.querySelector("#mainHeader");

window.addEventListener(
  "scroll",
  () => {

    if (window.scrollY > 50) {

      header.classList.add(
        "scrolled"
      );

    } else {

      header.classList.remove(
        "scrolled"
      );

    }

  }
);