import { CONFIG }
from "../config/config.js";


// =========================
// LOGIN
// =========================

export const loginUser =
  async (email, password) => {

    try {

      const response =
        await fetch(
          CONFIG.USERS_API
        );

      const users =
        await response.json();

      return users.find(
        (user) =>

          user.email === email &&
          user.password === password
      );

    } catch (error) {

      console.error(error);
    }
};


// =========================
// REGISTER
// =========================

export const registerUser =
  async (userData) => {

    try {

      const response =
        await fetch(
          CONFIG.USERS_API,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              userData
            ),
          }
        );

      return await response.json();

    } catch (error) {

      console.error(error);
    }
};