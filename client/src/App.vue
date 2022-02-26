<script setup>
import AppLayout from "@/layouts/AppLayout.vue";
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();

if (localStorage.getItem("token")) {
  auth.checkAuth();
}
</script>

<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>
