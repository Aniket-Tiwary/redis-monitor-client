import axios from "axios";

export default axios.create({
  baseURL: "https://redis-monitor-api.herokuapp.com/",
  // baseURL: "http://localhost:8080/",
});
