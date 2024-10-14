import { createI18n } from "vue-i18n";
import en from "@/lang/en.json";
import ar from "@/lang/ar.json";

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: localStorage.getItem("locale") || "en",
  fallbackLocale: localStorage.getItem("locale") || "en",
  availableLocales: ["en", "ar"],
  messages: { en, ar },
});
