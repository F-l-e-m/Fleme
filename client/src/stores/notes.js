import { defineStore } from "pinia";
import NotesApi from "@/api/notes";

export const useNotesStore = defineStore({
  id: "notes",
  state: () => ({
    notes: [],
  }),
  actions: {
    setNotes(notes) {
      this.notes = notes;
    },

    async getAll() {
      return NotesApi.all()
        .then(({ data }) => {
          this.setNotes(data.data);
        })
        .catch((err) => {
          throw err;
        });
    },

    async create(data) {
      return NotesApi.create(data)
        .then(async () => {
          await this.getAll();
        })
        .catch((err) => {
          throw err;
        });
    },

    async delete(id) {
      return NotesApi.delete(id)
        .then(async () => {
          await this.getAll();
        })
        .catch((err) => {
          throw err;
        });
    },
  },
});
