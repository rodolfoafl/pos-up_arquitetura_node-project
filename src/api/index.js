import axios from "axios";

export const API = axios.create({
  baseURL: "https://opentdb.com/",
  headers: {
    "Content-Type": "application/json",
  },
});
