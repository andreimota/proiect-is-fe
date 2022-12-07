import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const get = async (url: string) => {
  const response = (await axios.get(`${baseURL}${url}`))?.data;

  return response;
};

const post = async (data: any, url: string) => {
  const response = (await axios.post(`${baseURL}${url}`, data))?.data;

  return response;
};

const put = async (data: any, url: string) => {
  const response = (await axios.put(`${baseURL}${url}`, data))?.data;

  return response;
};

const api = {
  get,
  post,
  put
};

export default api;