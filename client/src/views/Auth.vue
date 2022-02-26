<script setup>
import LoginForm from "@/components/LoginForm.vue";
import RegistrationForm from "@/components/RegistrationForm.vue";

import { NCard, NTabs, NTabPane } from "naive-ui";
</script>

<template>
  <n-card class="auth">
    <n-tabs type="line">
      <n-tab-pane name="Login">
        <LoginForm />
      </n-tab-pane>
      <n-tab-pane name="Registration">
        <RegistrationForm />
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>
