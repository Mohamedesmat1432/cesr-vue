<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import SwitchLang from "@/components/SwitchLang.vue";

const authStore = useAuthStore();
const isOpen = ref(false);
const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <header>
    <nav class="bg-gray-800 text-white">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              @click="toggleMenu"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                v-if="!isMenuOpen"
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              <svg
                v-else
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div
            class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
          >
            <div class="flex-shrink-0">
              <h1 class="text-xl font-bold">
                <img class="h-8 rounded-full" src="/brand-logo.png" alt="elgamal" />
              </h1>
            </div>
            <div class="hidden sm:block sm:ml-6">
              <div class="flex space-x-4 rtl:space-x-reverse">
                <div class="flex space-x-4 rtl:space-x-reverse">
                  <RouterLink :to="{ name: 'home' }" class="nav-link">
                    {{ $t("home") }}
                  </RouterLink>
                </div>
                <div v-if="authStore.user" class="flex space-x-4 rtl:space-x-reverse">
                  <RouterLink :to="{ name: 'roles' }" class="nav-link">
                    {{ $t("roles") }}
                  </RouterLink>
                  <RouterLink :to="{ name: 'permissions' }" class="nav-link">
                    {{ $t("permissions") }}
                  </RouterLink>
                  <p class="py-2 text-sm text-slate-300">
                    Welcome {{ authStore.user?.name }}
                  </p>
                  <form @submit.prevent="authStore.logout($t('network_error'))">
                    <button type="submit" class="nav-link">{{ $t("logout") }}</button>
                  </form>
                </div>
                <div v-else class="flex space-x-4 rtl:space-x-reverse">
                  <RouterLink :to="{ name: 'register' }" class="nav-link">
                    {{ $t("register") }}
                  </RouterLink>
                  <RouterLink :to="{ name: 'login' }" class="nav-link">
                    {{ $t("login") }}
                  </RouterLink>
                </div>
                <SwitchLang class="nav-link" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="isMenuOpen" class="sm:hidden" id="mobile-menu">
        <div class="px-2 pt-2 pb-3">
          <div class="space-y-1">
            <RouterLink :to="{ name: 'home' }" class="nav-link">
              {{ $t("home") }}
            </RouterLink>
            <SwitchLang class="nav-link" />
          </div>
          <div v-if="authStore.user" class="space-y-1">
            <RouterLink :to="{ name: 'roles' }" class="nav-link">
              {{ $t("roles") }}
            </RouterLink>
            <RouterLink :to="{ name: 'permissions' }" class="nav-link">
              {{ $t("permissions") }}
            </RouterLink>
            <p class="block px-2 py-2 text-sm text-slate-300">
              Welcome {{ authStore.user?.name }}
            </p>
            <form @submit.prevent="authStore.logout($t('network_error'))" class="block">
              <button type="submit" class="nav-link">{{ $t("logout") }}</button>
            </form>
          </div>
          <div v-else class="space-y-1">
            <RouterLink :to="{ name: 'register' }" class="nav-link">
              {{ $t("register") }}
            </RouterLink>
            <RouterLink :to="{ name: 'login' }" class="nav-link">
              {{ $t("login") }}
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
