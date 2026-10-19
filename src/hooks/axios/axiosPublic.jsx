import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: "https://past-portals-server.onrender.com/api/v1",
});
