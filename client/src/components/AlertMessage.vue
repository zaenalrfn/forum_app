
<template>
  <div>
    <Message severity="error">{{ props.message }}</Message>
  </div>
</template>

<script setup>
import Message from "primevue/message";

const props = defineProps({
  message: {
    type: String,
  },
});
</script>