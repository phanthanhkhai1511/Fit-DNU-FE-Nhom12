import { CONFIG } from "../config/config.js";

export const createBooking =
  async (bookingData) => {

    try {

      const response = await fetch(
        CONFIG.BOOKINGS_API,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            bookingData
          ),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Cannot create booking"
        );
      }

      return await response.json();

    } catch (error) {
      console.error(error);
    }
};

export const getBookings =
  async () => {

    try {

      const response = await fetch(
        CONFIG.BOOKINGS_API
      );

      return await response.json();

    } catch (error) {
      console.error(error);
    }
};

export const deleteBooking =
  async (id) => {

    try {

      await fetch(
        `${CONFIG.BOOKINGS_API}/${id}`,
        {
          method: "DELETE",
        }
      );

    } catch (error) {
      console.error(error);
    }
};

export const updateBookingStatus =
  async (id, status) => {

    try {

      await fetch(
        `${CONFIG.BOOKINGS_API}/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            status,
          }),
        }
      );

    } catch (error) {
      console.error(error);
    }
};