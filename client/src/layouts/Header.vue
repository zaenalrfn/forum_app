<template>
  <div>
    <Menubar
      class="bg-primary-500 border-noround flex justify-content-between"
      :model="items"
    >
      <template #end>
        <Button
          label="Login"
          v-if="!authStores.currentUser"
          icon="pi pi-user"
          @click="dialog = true"
        />
        <div v-else>
          <Button label="Dashboard" icon="pi pi-home" />
          <Button
            label="Logout"
            @click="LogoutUser"
            class="ml-3"
            severity="danger"
          />
        </div>
      </template>
    </Menubar>

    <!-- Dialog -->
    <FormAuthComponent v-model:visible="dialog" />
  </div>
</template>

<script setup>
import Menubar from "primevue/menubar";
import FormAuthComponent from "@/components/FormAuthComponent.vue";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStores } from "@/stores/authStores.js";

// tampung didalam variabel
const authStores = useAuthStores();

// Action pinia
const { LogoutUser } = authStores;

// State pinia
const { dialog } = storeToRefs(authStores);

const items = ref([
  {
    label: "Home",
    icon: "pi pi-home",
  },
  {
    label: "Projects",
    icon: "pi pi-search",
    items: [
      {
        label: "Components",
        icon: "pi pi-bolt",
      },
      {
        label: "Blocks",
        icon: "pi pi-server",
      },
    ],
  },
  {
    label: "Contact",
    icon: "pi pi-envelope",
  },
]);
</script>
