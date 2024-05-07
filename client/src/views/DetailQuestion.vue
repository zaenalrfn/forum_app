<template>
  <div>
    <div>
      <DetailQuestionComponent v-if="questionData" :data="questionData" />
      <LoadingSpinner v-else />
    </div>

    <Divider />
    <!-- jawaban pertanyaan -->
    <h1 class="text-2xl text-primary">List Jawaban</h1>
    <CardAnswer
      v-if="questionData"
      v-for="data in questionData.listAnswer"
      :data="data"
      @reload="DetailQuestion()"
    />
    <div v-if="questionData && !questionData.listAnswer.length">
      <h1>Belum ada jawaban</h1>
    </div>
    <div v-if="authStores.currentUser">
      <Divider />
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
import CardAnswer from "@/components/Answer/CardAnswer.vue";

const questionData = ref(null);
const route = useRoute();

const authStores = useAuthStores();

const DetailQuestion = async () => {
  try {
    const { data } = await customFetch.get(`/question/${route.params.id}`);
    questionData.value = data.data;
    console.log(questionData.value);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  DetailQuestion();
});
</script>