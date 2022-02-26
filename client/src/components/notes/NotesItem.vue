<script setup>
import { NIcon } from "naive-ui";
import { CloseFilled } from "@vicons/material";
import { useNotesStore } from "@/stores/notes";

defineProps({
  note: {
    type: Object,
    required: true,
  },
});

const notesStore = useNotesStore();

const deleteNote = (id) => {
  notesStore.delete(id);
};
</script>

<template>
  <button class="notes-item">
    <router-link
      :to="{ name: 'me-notes-id', params: { id: note.id } }"
      class="notes-item__link"
    >
      <p>{{ note.name }}</p>
    </router-link>
    <n-icon size="16" class="notes-item__icon" @click="deleteNote(note.id)"
      ><close-filled
    /></n-icon>
  </button>
</template>

<style scoped lang="scss">
.notes-item {
  position: relative;
  display: flex;
  align-items: center;
  background: transparent;
  border: 1px solid rgb(224, 224, 230);
  transition: border-color, color 0.4s;
  padding: 0;

  &:hover {
    border: 1px solid #36ad6a;
    color: red;

    a {
      color: #36ad6a;
    }
  }

  &__link {
    color: rgb(51, 54, 57);
    transition: color 0.4s;
    text-decoration: none;
    padding: 10px 40px 10px 20px;
  }
  &__icon {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    padding: 10px;
  }
}
</style>
