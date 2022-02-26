<script setup>
import NotesItem from "./NotesItem.vue";

defineProps({
  notes: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <ul class="notes-list">
    <li v-for="note in notes" :key="note.id" class="notes-list__item">
      <NotesItem :note="note" />
    </li>
  </ul>
</template>

<style scoped lang="scss">
.notes-list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;

  &__item {
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
