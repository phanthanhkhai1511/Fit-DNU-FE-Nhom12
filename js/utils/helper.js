export const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("API ERROR");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};