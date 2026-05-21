import { CONFIG } from "../config/config.js";

export const getTechnicians = async () => {
  try {

    const response = await fetch(
      CONFIG.TECHNICIANS_API
    );

    if (!response.ok) {
      throw new Error(
        "Cannot fetch technicians"
      );
    }

    return await response.json();

  } catch (error) {
    console.error(error);
  }
};

export const createTechnician =
  async (technicianData) => {

    try {

      const response = await fetch(
        CONFIG.TECHNICIANS_API,
        {
          method:"POST",

          headers:{
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            technicianData
          ),
        }
      );

      return await response.json();

    } catch(error){
      console.error(error);
    }
};

export const deleteTechnician =
  async (id) => {

    try {

      await fetch(
        `${CONFIG.TECHNICIANS_API}/${id}`,
        {
          method:"DELETE",
        }
      );

    } catch(error){
      console.error(error);
    }
};