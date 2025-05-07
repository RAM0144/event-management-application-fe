import axios from "axios";

const instance = axios.create({
     baseURL: import.meta.env.VITE_BE_URL || "http://localhost:4800",
     timeout: 10000,
    headers: {
        "Customer-Header" : "Hi Hello",
    },
});


instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers["Authorization"] = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  

export default instance;