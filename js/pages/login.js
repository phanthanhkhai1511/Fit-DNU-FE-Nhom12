import {
  loginUser
} from "../api/auth.api.js";

const loginForm =
  document.querySelector(
    "#loginForm"
  );

loginForm.addEventListener(
  "submit",

  async (e) => {

    e.preventDefault();

    const email =
      document.querySelector(
        "#email"
      ).value;

    const password =
      document.querySelector(
        "#password"
      ).value;

    const user =
      await loginUser(
        email,
        password
      );

    if(!user){

      alert(
        "Sai tài khoản hoặc mật khẩu"
      );

      return;
    }

    // LƯU USER LOGIN

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    alert(
      "Đăng nhập thành công!"
    );

    // KIỂM TRA ROLE

    if(user.role === "admin"){

      window.location.href =
        "../admin/bookings.html";
    }

    else{

      window.location.href =
        "../index.html";
    }
  }
);