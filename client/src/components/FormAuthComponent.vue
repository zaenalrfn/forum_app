<template>
  <Dialog
    modal
    :pt="{
      root: 'border-none',
      mask: {
        style: 'backdrop-filter: blur(2px)',
      },
    }"
  >
    <template #container="{ closeCallback }">
      <form @submit.prevent="handleSubmit">
        <div
          class="flex flex-column px-5 py-5 gap-4"
          style="
            border-radius: 12px;
            background-image: radial-gradient(
              circle at left top,
              var(--primary-400),
              var(--primary-700)
            );
          "
        >
          <div class="block mx-auto text-white">
            <h1>Logo</h1>
          </div>
          <!-- import component alertMessage -->
          <AlertMessage
            v-if="authStores.errorAlert"
            :message="authStores.errorMsg"
            style="max-width: 320px"
          />
          <div class="inline-flex flex-column gap-2" v-if="!isLogin">
            <label for="username" class="text-primary-50 font-semibold"
              >Username</label
            >
            <InputText
              id="username"
              type="text"
              v-model="userInput.name"
              class="bg-white-alpha-20 border-none p-3 text-primary-50 w-20rem"
            ></InputText>
          </div>
          <div class="inline-flex flex-column gap-2">
            <label for="email" class="text-primary-50 font-semibold"
              >Email</label
            >
            <InputText
              id="email"
              type="email"
              v-model="userInput.email"
              class="bg-white-alpha-20 border-none p-3 text-primary-50 w-20rem"
            ></InputText>
          </div>
          <div class="inline-flex flex-column gap-2">
            <label for="password" class="text-primary-50 font-semibold"
              >Password</label
            >
            <InputText
              id="password"
              v-model="userInput.password"
              class="bg-white-alpha-20 border-none p-3 text-primary-50 w-20rem"
              type="password"
            ></InputText>
          </div>
          <div class="flex align-items-center gap-3">
            <Button
              label="Cancel"
              @click="closeCallback"
              text
              class="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
            ></Button>
            <Button
              :label="isLogin ? 'Login' : 'Register'"
              type="submit"
              text
              class="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
            ></Button>
          </div>
          <div style="width: 320px" class="text-white">
            <p v-if="isLogin">
              Belum punya akun? Silahkan
              <span
                @click="isLogin = false"
                class="cursor-pointer my-2 text-green-400"
                >Register</span
              >
            </p>
            <p v-else>
              Sudah puna akun? Silahkan
              <span
                @click="isLogin = true"
                class="cursor-pointer my-2 text-green-400"
                >Login</span
              >
            </p>
          </div>
        </div>
      </form>
    </template>
  </Dialog>
</template>

<script setup>
// reactive ini bisa menampung banyak data
import { reactive, ref } from "vue";
import { useAuthStores } from "@/stores/authStores.js";
import AlertMessage from "./AlertMessage.vue";

// State Store
const authStores = useAuthStores();
// state Action store
const { LoginUser, RegisterUser } = authStores;

// state biasa dari component ini
const userInput = reactive({
  name: "",
  email: "",
  password: "",
});
const isLogin = ref(true);

const clearInput = () => {
  userInput.name = "";
  userInput.email = "";
  userInput.password = "";
};

const handleSubmit = () => {
  // ketika isLogin nilainya true maka akan menjalankan fungsi LoginUser dan ketia isLogin nilainya false maka akan menjalankan fungsi RegisterUser
  if (isLogin.value == true) {
    LoginUser(userInput);
    clearInput();
  } else {
    RegisterUser(userInput);
    clearInput();
  }
};
</script>
