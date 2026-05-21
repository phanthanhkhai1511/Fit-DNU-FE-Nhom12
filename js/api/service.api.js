import { CONFIG } from "../config/config.js";

export const getServices = async () => {
  try {
    const response = await fetch(
      CONFIG.SERVICES_API
    );

    if (!response.ok) {
      throw new Error(
        "Cannot fetch services"
      );
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const createService =
  async (serviceData) => {

    try {

      const response = await fetch(
        CONFIG.SERVICES_API,
        {
          method:"POST",

          headers:{
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            serviceData
          ),
        }
      );

      return await response.json();

    } catch(error){
      console.error(error);
    }
};

export const deleteService =
  async (id) => {

    try {

      await fetch(
        `${CONFIG.SERVICES_API}/${id}`,
        {
          method:"DELETE",
        }
      );

    } catch(error){
      console.error(error);
    }
};

export const updateService =
  async (id, serviceData) => {

    try {

      const response = await fetch(
        `${CONFIG.SERVICES_API}/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            serviceData
          ),
        }
      );

      return await response.json();

    } catch (error) {
      console.error(error);
    }
};