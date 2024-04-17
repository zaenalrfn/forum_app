<template>
  <main>
    <div class="grid">
      <aside class="col-2">
        <div class="text-center p-3 border-round-sm bg-indigo-100 font-bold">
          Filter
        </div>
      </aside>
      <section class="col">
        <div class="p-3 border-round-sm bg-indigo-50">
          <div class="flex justify-content-between mb-3">
            <h2 class="text-4xl text-primary">List Pertanyaan</h2>
            <Button
              label="Tambah"
              rounded
              type="button"
              @click="dialog = true"
              icon="pi pi-plus"
            />
          </div>

          <!-- dialog pertanyaan -->
          <Dialog
            v-model:visible="dialog"
            modal
            header="Edit Profile"
            :style="{ width: '70%' }"
          >
            <span class="p-text-secondary block mb-5"
              >Update your information.</span
            >
            <FormQuestion @close="closeDialog()" />
          </Dialog>

          <ListQuestion />
          <ListQuestion />
          <ListQuestion />
          <ListQuestion />
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import ListQuestion from "@/components/Question/ListQuestion.vue";
import Dialog from "primevue/dialog";
import { ref } from "vue";
import FormQuestion from "@/components/Question/FormQuestion.vue";

const dialog = ref(false);

const closeDialog = () => {
  dialog.value = false;
};
</script>
