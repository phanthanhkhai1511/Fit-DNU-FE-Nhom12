import {

  logout,

  getCurrentUser

}
from "../utils/auth.js";

const navList =
  document.querySelector(
    "#navList"
  );

const user =
  getCurrentUser();


// =========================
// CHƯA LOGIN
// =========================

if(!user){

  navList.innerHTML = `

    <li>
      <a href="./pages/login.html">
        Login
      </a>
    </li>

    <li>
      <a href="./pages/register.html">
        Register
      </a>
    </li>
  `;
}


// =========================
// ĐÃ LOGIN
// =========================

else{

  navList.innerHTML = `

    <li>
      Xin chào,
      ${user.name}
    </li>

    ${
      user.role === "admin"

      ?

      `
      <li>

        <a href="./admin/services.html">
          Dashboard
        </a>

      </li>
      `

      :

      ""
    }

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
    document.querySelector(
      "#logoutBtn"
    );

  logoutBtn.addEventListener(
    "click",
    logout
  );
}