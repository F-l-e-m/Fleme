<script setup>
import {
  NLayout,
  NLayoutSider,
  NMenu,
  NLayoutHeader,
  NLayoutContent,
  NButton,
  NIcon,
} from "naive-ui";

import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { LanguageFilled, ExitToAppFilled } from "@vicons/material";
import { APP_VERSION as appVersion } from "@/constants/common";
import useMenuOptions from "@/composables/useMenuOptions";

const { locale } = useI18n();
const collapsed = ref(false);
const menuOptions = useMenuOptions();

const changeLang = () => {
  const lang = locale.value === "en" ? "ru" : "en";
  localStorage.setItem("lang", lang);
  locale.value = lang;
};
</script>

<template>
  <div class="default-layout">
    <n-layout>
      <n-layout-header class="default-layout__header">
        {{ appVersion }}
        <div class="default-layout__header-icons">
          <n-icon size="30" class="default-layout__header-icon">
            <n-button @click="changeLang">
              <language-filled />
            </n-button>
          </n-icon>
          <n-icon size="30" class="default-layout__header-icon">
            <n-button>
              <exit-to-app-filled />
            </n-button>
          </n-icon>
        </div>
      </n-layout-header>
      <n-layout has-sider>
        <n-layout-sider
          :collapsed="collapsed"
          show-trigger
          :collapsed-width="64"
          collapse-mode="width"
          bordered
          @collapse="collapsed = true"
          @expand="collapsed = false"
        >
          <n-menu
            :collapsed="collapsed"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
          />
        </n-layout-sider>
        <n-layout-content class="default-layout__content">
          <main>
            <slot></slot>
          </main>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </div>
</template>

<style scoped lang="scss">
.default-layout {
  &__header {
    margin-top: 10px;
    display: flex;
    align-items: center;
  }

  &__header-icons {
    margin-left: auto;
  }

  &__header-icon {
    height: 100%;
    margin-left: 20px;

    &:last-child {
      margin-right: 40px;
    }
  }

  &__content {
    padding-left: 20px;
    height: 100vh;
  }
}
</style>
