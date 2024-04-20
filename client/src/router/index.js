import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DashboardView from "@/views/DashboardView.vue";
import { useAuthStores } from "@/stores/authStores.js";
import DetailQuestion from "@/views/DetailQuestion.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/question/:id",
      name: "DetailQuestion",
      component: DetailQuestion,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: DashboardView,
      meta: {
        requiredAuth: true,
      },
    },
  ],
});

// sebelum routernya yang diatas dijalankan sistem akan menjalankan beforeEachnya dulu
// ketika url di ubah ke halaman lain, ketika user belum login
router.beforeEach(async (to, from) => {
  const authStores = await useAuthStores();
  // mengamankan dengan meta
  if (to.meta.requiredAuth && !authStores.currentUser) {
    alert("Anda harus login dulu untuk mengakses halaman ini");
    return {
      path: "/",
    };
  }
});

export default router;
