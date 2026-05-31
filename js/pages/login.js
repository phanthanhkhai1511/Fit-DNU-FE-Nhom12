import { loginUser } from "../api/auth.api.js";
import { showToast } from "../utils/toast.js";

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

    if (!user) {

      showToast(
        "Sai tài khoản hoặc mật khẩu",
        "error"
      );

      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    showToast(
      "Đăng nhập thành công!",
      "success"
    );

    setTimeout(() => {

      window.location.href =
        "/index.html";

    }, 1200);

  }
);