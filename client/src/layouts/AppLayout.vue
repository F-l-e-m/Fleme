<script setup>
import TheDefaultLayout from "./TheDefaultLayout.vue";
import TheAuthLayout from "./TheAuthLayout.vue";
import { watch, shallowRef } from "vue";
import { useRoute } from "vue-router";

const layout = shallowRef(TheDefaultLayout);
const route = useRoute();
watch(
  () => route.meta,
  async (meta) => {
    try {
      layout.value = meta.layout === "auth" ? TheAuthLayout : TheDefaultLayout;
    } catch (e) {
      layout.value = TheDefaultLayout;
    }
  },
  { immediate: true }
);
</script>

<template>
  <component :is="layout">
    <slot />
  </component>
</template>
