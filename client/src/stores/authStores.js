import { defineStore } from "pinia";
import { ref } from "vue";
// mengambil entpoint dari backend yang ada di file app.js
import customFetch from "@/api.js";
import { useRouter } from "vue-router";

export const useAuthStores = defineStore("user", () => {
  const dialog = ref(false);
  // untuk menampung pesan error saat login
  const errorMsg = ref(null);
  const errorAlert = ref(false);
  const currentUser = ref(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);

  const router = useRouter();

  //   state submit login user
  const LoginUser = async (inputData) => {
    // validasi error
    try {
      const { data } = await customFetch.post("/auth/login", {
        email: inputData.email,
        password: inputData.password,
      });

      currentUser.value = data.data;
      localStorage.setItem("user", JSON.stringify(data.data));
      console.log(data);
      //   untuk menutup dialog
      dialog.value = false;

      // untuk mengdirect ke halaman dashboard
      router.push({ name: "Dashboard" });
    } catch (error) {
      errorAlert.value = true;
      errorMsg.value = error.response.data.message;
    }
  };

  // fungsi state logout
  const LogoutUser = async () => {
    try {
      localStorage.setItem("user", null);
      currentUser.value = null;
      await customFetch.get("/auth/logout");
      router.push({ name: "home" });
    } catch (error) {
      console.log(error);
    }
  };

  // fungsi state Register
  const RegisterUser = async (inputData) => {
    // validasi error
    try {
      const { data } = await customFetch.post("/auth/register", {
        name: inputData.name,
        email: inputData.email,
        password: inputData.password,
      });

      currentUser.value = data.data;
      localStorage.setItem("user", JSON.stringify(data.data));
      console.log(data);
      //   untuk menutup dialog
      dialog.value = false;

      // untuk mengdirect ke halaman dashboard
      router.push({ name: "Dashboard" });
    } catch (error) {
      errorAlert.value = true;
      errorMsg.value = error.response.data.message;
    }
  };

  return { dialog, LoginUser, errorMsg, errorAlert, currentUser, LogoutUser, RegisterUser };
});
