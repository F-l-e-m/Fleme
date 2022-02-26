import createClient from "./config/axiosSettings";
import { endpoints, serverApiUrl } from "./config";

const client = createClient(serverApiUrl);

export default class NotesApi {
  static async all() {
    return client.get(endpoints.notes.all);
  }

  static async create({ name, user }) {
    return client.post(endpoints.notes.create, {
      name,
      user,
    });
  }

  static async delete(id) {
    return client.delete(`${endpoints.notes.delete}/${id}`);
  }
}
