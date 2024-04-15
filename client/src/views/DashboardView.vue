<template>
  <div>
    <div v-if="user">
      <h1>Hai, 🖐️</h1>
      <h1>Selamat Datang kembali {{ user.name }}</h1>
    </div>
  </div>
</template>


<script setup>
import customFetch from "@/api";
import { ref, onMounted } from "vue";

const user = ref(null);

const getUser = async () => {
  const { data } = await customFetch.get("/auth/getUser");
  console.log(data);
  user.value = data.user;
};

onMounted(() => {
  getUser();
});
</script>