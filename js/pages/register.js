import {
  registerUser
} from "../api/auth.api.js";

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

    await registerUser(
      userData
    );

    alert(
      "Đăng ký thành công!"
    );

    window.location.href =
      "./login.html";
  }
);