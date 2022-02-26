<script setup>
import { ref } from "vue";
import NotesList from "@/components/notes/NotesList.vue";
import { NButton, NIcon, NInput } from "naive-ui";
import { Add } from "@vicons/ionicons5";
import { useAuthStore } from "@/stores/auth";
import { useNotesStore } from "@/stores/notes";
const authStore = useAuthStore();
const notesStore = useNotesStore();

const newNoteFolderValue = ref(null);

notesStore.getAll();

const addNewNote = () => {
  notesStore.create({ name: newNoteFolderValue.value, user: authStore.user });
};
</script>

<template>
  <div class="me-notes">
    <NotesList :notes="notesStore.notes" />
    <div class="me-notes__new-note">
      <n-input type="text" v-model:value="newNoteFolderValue" maxlength="16" />
      <n-button @click="addNewNote">
        <template #icon>
          <n-icon><add /></n-icon>
        </template>
      </n-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.me-notes {
  display: flex;
  justify-content: space-between;

  &__new-note {
    display: flex;
    align-items: center;
  }
}
</style>
