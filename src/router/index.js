import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Register from '@/views/Auth/Register.vue'
import Login from '@/views/Auth/Login.vue'
import CreateRole from '@/views/Role/CreateRole.vue'
import ListRole from '@/views/Role/ListRole.vue'
import UpdateRole from '@/views/Role/UpdateRole.vue'
import CreatePermission from '@/views/Permission/CreatePermission.vue'
import ListPermission from '@/views/Permission/ListPermission.vue'
import UpdatePermission from '@/views/Permission/UpdatePermission.vue'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { guest: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { guest: true }
    },
    {
      path: '/roles',
      name: 'roles',
      component: ListRole,
      meta: { auth: true }
    },
    {
      path: '/create-role',
      name: 'create-role',
      component: CreateRole,
      meta: { auth: true }
    },
    // {
    //   path: '/roles/:id',
    //   name: 'show-role',
    //   component: ShowRole,
    //   meta: { auth: true }
    // },
    {
      path: '/roles/update/:id',
      name: 'roles-update',
      component: UpdateRole,
      meta: { auth: true }
    },
    {
      path: '/permissions',
      name: 'permissions',
      component: ListPermission,
      meta: { auth: true }
    },
    {
      path: '/create-permission',
      name: 'create-permission',
      component: CreatePermission,
      meta: { auth: true }
    },
    // {
    //   path: '/permissions/:id',
    //   name: 'show-permission',
    //   component: ShowPermission,
    //   meta: { auth: true }
    // },
    {
      path: '/permissions/update/:id',
      name: 'permissions-update',
      component: UpdatePermission,
      meta: { auth: true }
    }

  ]
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()
  await authStore.getUser()

  if (authStore.user && to.meta.guest) {
    return { name: 'home' }
  }

  if (!authStore.user && to.meta.auth) {
    return { name: 'login' }
  }
})

export default router
