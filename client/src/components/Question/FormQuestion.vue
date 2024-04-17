<template>
  <div>
    <div class="flex align-items-center gap-3 mb-3">
      <InputText
        class="flex-auto"
        autocomplete="off"
        placeholder="Masukkan Judul Pertanyaan"
      />
    </div>
    <div class="flex align-items-center gap-3 mb-5">
      <Editor
        editorStyle="height: 320px"
        style="width: 100%"
        placeholder="Masukkan pertanyaan kamu"
      />
    </div>
    <div class="flex align-items-center gap-3 mb-3">
      <Dropdown
        v-model="kategori"
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
      <Button type="button" label="Save" @click="$emit('close')"></Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineEmits(["close"]);

const kategori = ref("");
const kategoris = ref([
  "javascript",
  "database",
  "bakcend",
  "expressjs",
  "vuejs",
]);
</script>