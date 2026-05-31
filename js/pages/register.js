import {
  registerUser
} from "../api/auth.api.js";

import {
  showToast
} from "../utils/toast.js";

const registerForm =
  document.querySelector(
    "#registerForm"
  );

registerForm.addEventListener(
  "submit",

  async (e) => {

    e.preventDefault();

    const userData = {

      name:
        document.querySelector(
          "#name"
        ).value,

      email:
        document.querySelector(
          "#email"
        ).value,

      password:
        document.querySelector(
          "#password"
        ).value,

      role: "user",
    };

    try {

      await registerUser(
        userData
      );

      showToast(
        "Đăng ký thành công!",
        "success"
      );

      setTimeout(() => {

        window.location.href =
          "./login.html";

      }, 1200);

    } catch (error) {

      console.log(error);

      showToast(
        "Đăng ký thất bại!",
        "error"
      );
    }

  }
);