<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <AlertMessage
        v-if="errorAlert"
        :message="errorMessage"
        style="max-width: 100%; margin-bottom: 10px"
      />
      <div class="flex align-items-center gap-3 mb-3">
        <InputText
          class="flex-auto"
          autocomplete="off"
          placeholder="Masukkan Judul Pertanyaan"
          v-model="question.title"
        />
      </div>
      <div class="flex align-items-center gap-3 mb-5">
        <Editor
          editorStyle="height: 320px"
          style="width: 100%"
          placeholder="Masukkan pertanyaan kamu"
          v-model="question.question"
        />
      </div>
      <div class="flex align-items-center gap-3 mb-3">
        <Dropdown
          v-model="question.kategori"
          :options="kategoris"
          placeholder="Pilih kategori pertanyaan"
          class="w-full"
        />
      </div>
      <div class="flex justify-content-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="$emit('close')"
        ></Button>
        <Button type="submit" label="Submit"></Button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import customFetch from "@/api";
import AlertMessage from "../AlertMessage.vue";

const emit = defineEmits(["close"]);

const question = reactive({
  title: "",
  question: "",
  kategori: "",
});

// state alert
const errorMessage = ref("");
const errorAlert = ref(false);

const clearInput = () => {
  question.title = "";
  question.question = "";
  question.kategori = "";
};

const handleSubmit = async () => {
  try {
    const questionData = await customFetch.post("/question", {
      title: question.title,
      question: question.question,
      kategori: question.kategori,
    });
    if (questionData) {
      clearInput();
      emit("close");
      emit("reload");
    }
  } catch (error) {
    errorAlert.value = true;
    errorMessage.value = error.response.data.message;
  }
};

const kategoris = ref([
  "javascript",
  "database",
  "bakcend",
  "expressjs",
  "vuejs",
]);
</script>