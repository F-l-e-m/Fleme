import createClient from "./config/axiosSettings";
import { endpoints, currencyURL } from "./config";

const client = createClient(currencyURL);

export default class Currency {
  static async get(currency) {
    return client.get(endpoints.currency.latest, {
      params: {
        apikey: import.meta.env.CURRENCY_API_KEY,
        base_currency: currency,
      },
    });
  }
}
