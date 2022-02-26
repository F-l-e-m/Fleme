<script setup>
import NoteContentItem from "./NoteContentitem.vue";
import { NButton, NInput } from "naive-ui";
</script>

<template>
  <n-input type="textarea" placeholder="Basic Textarea"></n-input>
  <n-button>add</n-button>
  <ul class="note-content-list">
    <li>
      <NoteContentItem />
    </li>
  </ul>
</template>

<style scoped lang="scss">
.note-content-list {
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
