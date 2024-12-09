import axios from "axios";
const baseApi = process.env.REACT_APP_API_KEY;

export const login = async (username: string, password: string) => {
  return await axios
    .post(`${baseApi}/login`, { username, password })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};
