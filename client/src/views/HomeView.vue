<template>
  <main>
    <div class="grid">
      <aside class="col-2">
        <div class="p-3 border-round-sm bg-indigo-100">
          <form @submit.prevent="handleFilter">
            <div class="flex flex-column gap-2">
              <p class="font-bold">Kategori</p>
              <div
                v-for="kategori in categories"
                :key="kategori.key"
                class="flex align-items-center"
              >
                <RadioButton
                  v-model="selectedCategory"
                  :inputId="kategori.key"
                  name="kategori"
                  :value="kategori.name"
                />
                <label :for="kategori.key" class="ml-2">{{
                  kategori.name
                }}</label>
              </div>
            </div>
            <Divider />
            <div class="flex my-3">
              <Dropdown
                v-model="selectedQuestion"
                :options="questionFilter"
                optionLabel="name"
                optionValue="code"
                placeholder="Question Filter"
                class="w-full md:w-14rem"
              />
            </div>
            <Divider />
            <Button type="submit" label="Filter"></Button>
          </form>
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
          <div v-if="questions && !questions.length">
            <h1>Data tidak ada</h1>
          </div>
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
import Divider from "primevue/divider";
import RadioButton from "primevue/radiobutton";
import Dropdown from "primevue/dropdown";

const selectedCategory = ref(null);
const categories = ref([
  { name: "javascript", key: "JS" },
  { name: "database", key: "DB" },
  { name: "vuejs", key: "VU" },
  { name: "expressjs", key: "ER" },
  { name: "backend", key: "BE" },
]);

const selectedQuestion = ref(null);
const questionFilter = ref([
  { name: "New Question", code: "-createdAt" },
  { name: "Old Question", code: "createdAt" },
  { name: "A - Z Question", code: "title" },
]);

const handleFilter = async () => {
  await allQuestion();
};

const questions = ref(null);
const dialog = ref(false);
const authStore = useAuthStores();

const allQuestion = async () => {
  try {
    const params = {
      sort: selectedQuestion.value,
      kategori: selectedCategory.value,
    };
    const { data } = await customFetch.get("/question", {
      params,
    });
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
