<script setup>
import { useI18n } from "vue-i18n";
import { NForm, NFormItem, NInput, NButton } from "naive-ui";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const { t } = useI18n();

const formRef = ref(null);
const auth = useAuthStore();
const router = useRouter();

const form = reactive({
  email: null,
  password: null,
});

const validatePasswordLength = (rule, value) => {
  return value?.length > 6;
};

const rules = {
  email: [
    {
      required: true,
      message: "Email is required",
      trigger: ["input"],
    },
  ],
  password: [
    {
      required: true,
      message: "Password is required",
      trigger: ["input", "blur"],
    },
    {
      required: true,
      message: "Password must be at least 6 characters",
      trigger: ["input", "blur"],
      validator: validatePasswordLength,
    },
  ],
};

const login = (e) => {
  e.preventDefault();
  formRef.value.validate((errors) => {
    if (errors) return;
    auth
      .login({
        email: form.email,
        password: form.password,
      })
      .then(() => {
        router.push({ name: "me" });
      })
      .catch((err) => {
        console.log("login-error", err.response.data.message);
      });
  });
};
</script>

<template>
  <h1>{{ t("auth.login") }}</h1>
  <n-form :model="form" ref="formRef" :rules="rules">
    <n-form-item :label="t('auth.email')" path="email">
      <n-input
        :placeholder="t('auth.pleaseEnterEmail')"
        v-model:value="form.email"
      />
    </n-form-item>
    <n-form-item :label="t('auth.password')" path="password">
      <n-input
        v-model:value="form.password"
        type="password"
        :placeholder="t('auth.pleaseEnterPassword')"
        minlength="6"
      />
    </n-form-item>
  </n-form>
  <n-button @click="login">Войти</n-button>
</template>
