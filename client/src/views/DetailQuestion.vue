<template>
  <div>
    <div>
      <DetailQuestionComponent v-if="questionData" :data="questionData" />
      <LoadingSpinner v-else />
    </div>
    <Divider />
    <div v-if="authStores.currentUser">
      <h1 class="text-3xl-primary">Jawaban</h1>
      <!-- Form answer -->
      <FormAnswerComponent
        @reload="DetailQuestion()"
        :data-question="questionData"
      />
    </div>
  </div>
</template>

<script setup>
import DetailQuestionComponent from "@/components/Question/DetailQuestionComponent.vue";
import { useRoute } from "vue-router";
import customFetch from "@/api";
import { ref, onMounted } from "vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import Divider from "primevue/divider";
import FormAnswerComponent from "@/components/Answer/FormAnswer.vue";
import { useAuthStores } from "@/stores/authStores";

const questionData = ref(null);
const route = useRoute();

const authStores = useAuthStores();

const DetailQuestion = async () => {
  try {
    const { data } = await customFetch.get(`/question/${route.params.id}`);
    questionData.value = data.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  DetailQuestion();
});
</script>