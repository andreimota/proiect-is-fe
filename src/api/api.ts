import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

axios.defaults.baseURL = baseURL;

const get = async (url: string) => {
  const response = (await axios.get(`${url}`))?.data;

  return response;
};

const post = async (data: unknown, url: string) => {
  const response = (await axios.post(`${url}`, data))?.data;

  return response;
};

const put = async (data: unknown, url: string) => {
  const response = (await axios.put(`${url}`, data));

  return response;
};

const api = {
  get,
  post,
  put
};

export default api;