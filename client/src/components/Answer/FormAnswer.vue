<template>
  <div>
    <div class="bg-blue-50 py-3 px-3">
      <form @submit.prevent="handleSubmit">
        <AlertMessage
          v-if="errorAlert"
          :message="errorMessage"
          style="max-width: 100%; margin-bottom: 10px"
        />
        <div class="flex align-items-center gap-3 mb-5">
          <Editor
            editorStyle="height: 200px"
            style="width: 100%"
            v-model="answer"
            placeholder="Masukkan jawaban kamu"
          />
        </div>
        <div class="flex justify-content-end gap-2">
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            @click="$emit('close')"
          ></Button>
          <Button type="submit" severity="success" label="Answer"></Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import customFetch from "@/api";
import AlertMessage from "../AlertMessage.vue";

const emit = defineEmits(["reload"]);
const props = defineProps({
  dataQuestion: {
    type: Object,
    required: true,
  },
});

const answer = ref("");

// state alert
const errorMessage = ref("");
const errorAlert = ref(false);

const clearInput = () => {
  answer.value = "";
};

const handleSubmit = async () => {
  try {
    await customFetch.post(`/answer/${props.dataQuestion._id}`, {
      answer: answer.value,
    });
    clearInput();
    emit("reload");
  } catch (error) {
    errorAlert.value = true;
    errorMessage.value = error.response.data.message;
  }
};
</script>