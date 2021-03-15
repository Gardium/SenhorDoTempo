import axios from "axios";
// https://api.hgbrasil.com/weather?key=5c1a4dfc&lat=-23.682&lon=-46.875

export const key = "dec37394";

const api = axios.create({
  baseURL: "https://api.hgbrasil.com/",
});

export default api;
