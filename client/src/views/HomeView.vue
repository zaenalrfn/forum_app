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
              v-if="authStore.currentUser"
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
            header="Buat Pertanyaan"
            :style="{ width: '70%' }"
          >
            <span class="p-text-secondary block mb-5"
              >Tambah your information.</span
            >
            <FormQuestion @close="closeDialog()" @reload="allQuestion()" />
          </Dialog>
          <ListQuestion
            v-if="questions"
            v-for="q in questions"
            :key="q.id"
            :data="q"
            @reload="allQuestion()"
          />
          <LoadingSpinner v-else />
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import ListQuestion from "@/components/Question/ListQuestion.vue";
import Dialog from "primevue/dialog";
import { ref, onMounted } from "vue";
import FormQuestion from "@/components/Question/FormQuestion.vue";
import customFetch from "@/api";
import { useAuthStores } from "@/stores/authStores.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const questions = ref("");
const dialog = ref(false);
const authStore = useAuthStores();

const allQuestion = async () => {
  try {
    const { data } = await customFetch.get("/question");
    questions.value = data.data;
  } catch (error) {
    console.log(error);
  }
};

const closeDialog = () => {
  dialog.value = false;
};

onMounted(() => {
  allQuestion();
});
</script>
