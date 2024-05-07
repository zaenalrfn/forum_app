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
            <p class="my-3">
              <!-- substring = untuk membatasi huruf, yang ditampilkan hanya 200 karakter aja -->
              <span v-html="props.data.answer"></span>
            </p>
          </Panel>
        </div>
      </div>
    </div>
  </div>
</template>

 <script setup>
import Panel from "primevue/panel";
import Avatar from "primevue/avatar";

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