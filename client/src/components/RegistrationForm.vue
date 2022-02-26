<script setup>
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { NForm, NFormItem, NInput, NButton } from "naive-ui";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const confirmPasswordRef = ref(null);
const formRef = ref(null);
const auth = useAuthStore();
const router = useRouter();

const handlePasswordInput = () => {
  if (form.confirmPassword) {
    confirmPasswordRef.value.validate({ trigger: "password-input" });
  }
};

const validatePasswordStartWith = (rule, value) => {
  return (
    form.password?.startsWith(value) && form.password.length >= value.length
  );
};

const validatePasswordLength = (rule, value) => {
  return value.length > 6;
};

const validatePasswordSame = (rule, value) => {
  return form.password === value;
};

const form = reactive({
  name: null,
  email: null,
  password: null,
  confirmPassword: null,
});

const rules = {
  name: [
    {
      required: true,
      message: "Name is required",
      trigger: ["input", "blur"],
    },
  ],
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
  confirmPassword: [
    {
      required: true,
      message: "Re-entered password is required",
      trigger: ["input", "blur"],
    },
    {
      validator: validatePasswordStartWith,
      required: true,
      message: "Password is not same as re-entered password!",
      trigger: "input",
    },
    {
      validator: validatePasswordSame,
      required: true,
      message: "Password is not same as re-entered password!",
      trigger: ["blur", "password-input"],
    },
  ],
};

const registration = (e) => {
  e.preventDefault();
  formRef.value.validate((errors) => {
    if (errors) return;
    auth
      .registration({
        email: form.email,
        password: form.password,
        name: form.name,
      })
      .then(() => {
        router.push({ name: "me" });
      })
      .catch((err) => {
        console.log("register-error", err.response.data.message);
      });
  });
};

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("auth.registration") }}</h1>
  <n-form :model="form" ref="formRef" :rules="rules">
    <n-form-item path="name" :label="t('auth.name')">
      <n-input
        :placeholder="t('auth.pleaseEnterName')"
        v-model:value="form.name"
      />
    </n-form-item>
    <n-form-item path="email" :label="t('auth.email')">
      <n-input
        v-model:value="form.email"
        :placeholder="t('auth.pleaseEnterEmail')"
      />
    </n-form-item>
    <n-form-item
      path="password"
      :label="t('auth.password')"
      @input="handlePasswordInput"
    >
      <n-input
        v-model:value="form.password"
        type="password"
        :placeholder="t('auth.pleaseEnterPassword')"
        minlength="6"
        show-password-on="click"
      />
    </n-form-item>
    <n-form-item
      path="confirmPassword"
      ref="confirmPasswordRef"
      :label="t('auth.repeatPassword')"
    >
      <n-input
        type="password"
        v-model:value="form.confirmPassword"
        :disabled="!form.password"
        :placeholder="t('auth.pleaseEnterRepeatPassword')"
        minlength="6"
        show-password-on="click"
      />
    </n-form-item>
  </n-form>
  <n-button @click="registration">Регистрация</n-button>
</template>
