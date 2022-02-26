import { createI18n } from "vue-i18n";
import en from "@/locales/en";
import ru from "@/locales/ru";
import { getSavedLocale } from "@/locales/helpers";

const i18n = createI18n({
  legacy: false,
  locale: getSavedLocale() || "en",
  messages: {
    en,
    ru,
  },
});

export default i18n;
