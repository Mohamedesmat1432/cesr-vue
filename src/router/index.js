import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/Auth/Register.vue"),
      meta: { guest: true },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Auth/Login.vue"),
      meta: { guest: true },
    },
    {
      path: "/roles",
      name: "roles",
      component: () => import("@/views/Role/ListRole.vue"),
      meta: { auth: true },
    },
    {
      path: "/create-role",
      name: "create-role",
      component: () => import("@/views/Role/CreateRole.vue"),
      meta: { auth: true },
    },
    // {
    //   path: '/roles/:id',
    //   name: 'show-role',
    // component: () => import("@/views/Role/ShowRole.vue"),
    //   meta: { auth: true }
    // },
    {
      path: "/roles/update/:id",
      name: "roles-update",
      component: () => import("@/views/Role/UpdateRole.vue"),
      meta: { auth: true },
    },
    {
      path: "/permissions",
      name: "permissions",
      component: () => import("@/views/Permission/ListPermission.vue"),
      meta: { auth: true },
    },
    {
      path: "/create-permission",
      name: "create-permission",
      component: () => import("@/views/Permission/CreatePermission.vue"),
      meta: { auth: true },
    },
    // {
    //   path: '/permissions/:id',
    //   name: 'show-permission',
    //   component: () => import("@/views/Permission/ShowPermission.vue"),
    //   meta: { auth: true }
    // },
    {
      path: "/permissions/update/:id",
      name: "permissions-update",
      component: () => import("@/views/Permission/UpdatePermission.vue"),
      meta: { auth: true },
    },
  ],
});

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  await authStore.getUser();

  if (authStore.user && to.meta.guest) {
    return { name: "home" };
  }

  if (!authStore.user && to.meta.auth) {
    return { name: "login" };
  }
});

export default router;
