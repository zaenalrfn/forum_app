<template>
  <div>
    <div class="card mb-2">
      <Panel>
        <template #header>
          <div class="flex align-items-center gap-2">
            <Avatar
              image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
              size="large"
              shape="circle"
            />
            <span class="font-bold">Amy Elsner</span>
          </div>
        </template>
        <template #icons>
          <button class="p-panel-header-icon p-link mr-2" @click="toggle">
            <span class="pi pi-cog"></span>
          </button>
          <Menu ref="menu" id="config_menu" :model="items" popup />
        </template>
        <template #footer>
          <div
            class="flex flex-wrap align-items-center justify-content-between gap-3"
          >
            <div class="flex align-items-center gap-2">
              <Button icon="pi pi-thumbs-up-fill" rounded text></Button>
              {{ props.data.countVote }}
            </div>
            <span class="p-text-secondary">{{
              dataFormat(props.data.createdAt)
            }}</span>
          </div>
        </template>
        <router-link
          :to="{ name: 'DetailQuestion', params: { id: props.data._id } }"
          class="text-4xl text-primary no-underline"
          >{{ props.data.title }}</router-link
        >
        <p class="my-3">
          <!-- substring = untuk membatasi huruf, yang ditampilkan hanya 200 karakter aja -->
          <span v-html="props.data.question.substring(0, 200)"></span>
        </p>
        <Chip :label="props.data.kategori" />
      </Panel>
    </div>
  </div>
</template>

 <script setup>
import Panel from "primevue/panel";
import Avatar from "primevue/avatar";
import Chip from "primevue/chip";
import Menu from "primevue/menu";
import { ref } from "vue";

const menu = ref(null);

const items = ref([
  {
    label: "Update",
    icon: "pi pi-refresh",
    command: () => {
      const data = props.data;
      console.log(data);
    },
  },
  {
    label: "Delete",
    icon: "pi pi-times",
    command: () => {
      console.log("Delete");
    },
  },
  {
    separator: true,
  },
  {
    label: "Report",
    icon: "pi pi-flag",
    command: () => {
      console.log("Report");
    },
  },
]);

const toggle = (event) => {
  menu.value.toggle(event);
};

const dataFormat = (dataInput) => {
  const newDate = new Date(dataInput).toLocaleString();
  return newDate;
};
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>