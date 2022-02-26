import createClient from "../api/config/axiosSettings";
import axios from "axios";
import { endpoints, serverApiUrl } from "../api/config";

const client = createClient(serverApiUrl);

export default class AuthService {
  static async login({ email, password }) {
    return client.post(endpoints.auth.login, {
      email,
      password,
    });
  }

  static async registration({ name, email, password }) {
    return client.post(endpoints.auth.register, {
      name,
      email,
      password,
    });
  }

  static async logout() {
    return client.post(endpoints.auth.logout);
  }

  static async refresh() {
    return axios.get(`${serverApiUrl}${endpoints.auth.refresh}`, {
      withCredentials: true,
    });
  }
}
