const currencyURL = import.meta.env.VITE_APP_CURRENCY_API_URL;
const serverApiUrl = import.meta.env.VITE_APP_SERVER_API_URL;

const endpoints = {
  currency: {
    latest: "/latest",
  },
  auth: {
    login: "/login",
    register: "/registration",
    logout: "/logout",
    refresh: "/refresh",
  },
  notes: {
    all: "/notes/all",
    create: "/notes/create",
    delete: "/notes/delete",
  },
};

export { currencyURL, serverApiUrl, endpoints };
