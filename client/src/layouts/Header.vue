<template>
  <div>
    <Menubar class="bg-primary-500 border-noround" :model="items">
      <template #end>
        <Button label="Login" icon="pi pi-user" @click="dialog = true" />
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

const dialog = ref(false);
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
