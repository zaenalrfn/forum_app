import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-light-indigo/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.component("InputText", InputText);
app.component("Dialog", Dialog);
app.component("Button", Button);
app.mount("#app");
