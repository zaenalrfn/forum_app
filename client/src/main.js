import { createApp, markRaw } from "vue";
import App from "./App.vue";
import router from "./router";

// import VuePrime
import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-light-indigo/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

// import Pinia
import { createPinia } from "pinia";
const app = createApp(App);

const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(PrimeVue);

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

// component PrimeVue
app.component("InputText", InputText);
app.component("Dialog", Dialog);
app.component("Button", Button);

app.mount("#app");
