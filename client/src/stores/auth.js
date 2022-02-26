import { defineStore } from "pinia";
import AuthService from "@/services/AuthService";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    isAuth: false,
    user: {},
  }),
  actions: {
    setAuth(isAuth) {
      this.isAuth = isAuth;
    },

    setUser(user) {
      this.user = user;
    },

    async registration(data) {
      return AuthService.registration(data)
        .then((res) => {
          localStorage.setItem("token", res.data.accessToken);
          this.setAuth(true);
          this.setUser(res.data.user);
        })
        .catch((err) => {
          throw err;
        });
    },

    async login(data) {
      return AuthService.login(data)
        .then((res) => {
          localStorage.setItem("token", res.data.accessToken);
          this.setAuth(true);
          this.setUser(res.data.user);
        })
        .catch((err) => {
          throw err;
        });
    },

    async logout(email, password) {
      return AuthService.logout(email, password)
        .then(() => {
          localStorage.removeItem("token");
          this.setAuth(false);
          this.setUser({});
        })
        .catch((err) => {
          throw err;
        });
    },

    async checkAuth() {
      return AuthService.refresh()
        .then((res) => {
          localStorage.setItem("token", res.data.accessToken);
          this.setAuth(true);
          this.setUser(res.data.user);
        })
        .catch((err) => {
          throw err;
        });
    },
  },
});
