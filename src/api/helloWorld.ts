import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const getWeatherForecast = async () => {
  const response: string = (await axios.get(`${baseURL}/HelloWorld`))?.data;

  return response;
};

const weatherForecastService = {
  getWeatherForecast
};

export default weatherForecastService;