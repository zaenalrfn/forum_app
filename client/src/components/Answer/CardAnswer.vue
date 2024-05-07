<template>
  <div>
    <div class="grid px-4 gap-4 bg-primary-50">
      <div class="col-1">
        <div class="flex align-items-center gap-2">
          <Button icon="pi pi-thumbs-up-fill" rounded text></Button>
          <span>{{ props.data.countVote }}</span>
        </div>
      </div>
      <div class="col">
        <div class="card mb-2">
          <Panel>
            <template #footer>
              <div
                class="flex flex-wrap align-items-center justify-content-between gap-3"
              >
                <div class="flex align-items-center gap-2">
                  <Avatar
                    image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                    size="small"
                    shape="circle"
                  />
                  <span class="font-bold">{{ props.data.user.name }}</span>
                </div>
                <span class="p-text-secondary">{{
                  dataFormat(props.data.createdAt)
                }}</span>
              </div>
            </template>
            <div
              class="mb-3 flex justify-content-end"
              v-if="
                authStores.currentUser &&
                authStores.currentUser._id === props.data.user._id
              "
            >
              <Button
                icon="pi pi-times"
                rounded
                severity="danger"
                @click="handleDelete(props.data._id)"
              />
            </div>
            <span v-html="props.data.answer"></span>
          </Panel>
        </div>
      </div>
    </div>
  </div>
</template>

 <script setup>
import Panel from "primevue/panel";
import Avatar from "primevue/avatar";
import { useAuthStores } from "@/stores/authStores.js";
import customFetch from "@/api";

const authStores = useAuthStores();

const emit = defineEmits(["reload"]);

const handleDelete = async (paramsId) => {
  try {
    await customFetch.delete(`/answer/${paramsId}`);
    alert("delete berhasil");
    emit("reload");
  } catch (error) {
    console.log(error);
  }
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