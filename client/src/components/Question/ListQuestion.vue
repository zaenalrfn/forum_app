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
          <div
            v-if="
              authStore.currentUser &&
              authStore.currentUser._id == props.data.userId
            "
          >
            <button class="p-panel-header-icon p-link mr-2" @click="toggle">
              <span class="pi pi-cog"></span>
            </button>
            <Menu ref="menu" id="config_menu" :model="items" popup />
          </div>
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
        <!-- dialog pertanyaan -->
        <Dialog
          v-model:visible="dialog"
          modal
          header="Update Pertanyaan"
          :style="{ width: '70%' }"
        >
          <span class="p-text-secondary block mb-5"
            >Update your information.</span
          >
          <FormQuestion
            v-if="dataQuestion"
            @close="dialog = false"
            :dataQuestion="dataQuestion"
            :isUpdate="true"
            @reload="reload()"
          />
        </Dialog>
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
import FormQuestion from "./FormQuestion.vue";
import { useAuthStores } from "@/stores/authStores.js";
import customFetch from "@/api";

const emit = defineEmits(["reload"]);
const authStore = useAuthStores();

const dialog = ref(false);
const menu = ref(null);
const dataQuestion = ref(null);

const reload = () => {
  emit("reload");
};

const items = ref([
  {
    label: "Update",
    icon: "pi pi-refresh",
    command: () => {
      const data = props.data;
      dataQuestion.value = data;
      dialog.value = true;
    },
  },
  {
    label: "Delete",
    icon: "pi pi-times",
    command: async () => {
      await customFetch.delete(`question/${props.data._id}`);
      alert("Berhasil hapus pertanyaan");
      emit("reload");
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