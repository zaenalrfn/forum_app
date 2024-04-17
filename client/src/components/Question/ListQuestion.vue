<template>
  <div>
    <div class="card mb-2">
      <Panel>
        <template #header>
          <div class="flex align-items-center gap-2">
            <Avatar
              image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
              size="large"
              shape="circle"
            />
            <span class="font-bold">Amy Elsner</span>
          </div>
        </template>
        <template #footer>
          <div
            class="flex flex-wrap align-items-center justify-content-between gap-3"
          >
            <div class="flex align-items-center gap-2">
              <Button icon="pi pi-thumbs-up-fill" rounded text></Button>
            </div>
            <span class="p-text-secondary">Updated 2 hours ago</span>
          </div>
        </template>
        <router-link to="/" class="text-4xl text-primary no-underline"
          >Judul Pertanyaan</router-link
        >
        <p class="my-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <Chip label="Javascript" />
      </Panel>
    </div>
  </div>
</template>

 <script setup>
import Panel from "primevue/panel";
import Avatar from "primevue/avatar";
import Chip from "primevue/chip";
</script>