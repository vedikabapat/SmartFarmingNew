import axios from "axios";

const API_KEY = "2964b27222c56119029a6f3a61c83ecd";

export const getWeather = async (city) => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    return res.data;
  } catch (error) {
    console.error("Weather API error:", error?.response?.status, error?.response?.data);
    return null;
  }
};