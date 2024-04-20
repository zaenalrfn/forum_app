<template>
  <div>
    <DetailQuestionComponent v-if="questionData" :data="questionData" />
    <LoadingSpinner v-else />
  </div>
</template>

<script setup>
import DetailQuestionComponent from "@/components/Question/DetailQuestionComponent.vue";
import { useRoute } from "vue-router";
import customFetch from "@/api";
import { ref, onMounted } from "vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const questionData = ref(null);
const route = useRoute();

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