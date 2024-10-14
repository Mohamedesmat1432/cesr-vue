import { createApp } from "vue";
import App from "./App.vue";
import { i18n } from "@/i18n";
import router from "@/router";
import pinia from "@/pinia";
import "vue-toastification/dist/index.css";
import "./assets/main.css";
import toast from "vue-toastification";
import AuthButton from "@/components/SubmitButton.vue";

const app = createApp(App);
app.use(i18n);
app.use(router);
app.use(pinia);

app.use(toast, { timeout: 2500 });
app.component("submit-button", AuthButton);
app.mount("#app");
