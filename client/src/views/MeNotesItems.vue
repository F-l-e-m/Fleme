<script setup>
import NoteContentList from "@/components/notes/NoteContentList.vue";

defineProps({
  id: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <NoteContentList />
</template>
