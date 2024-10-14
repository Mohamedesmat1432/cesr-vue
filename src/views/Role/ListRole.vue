<script setup>
import { computed, onMounted, reactive, watchEffect } from "vue";
import { useRoleStore } from "@/stores/roleStore";
import { storeToRefs } from "pinia";
import ConfirmDelete from "@/components/ConfirmDelete.vue";

const { roles, currentPage, lastPage, isVisible } = storeToRefs(useRoleStore());
const {
  loadRoles,
  openConfirmDelete,
  fetchPermissions,
  deleteRole,
  nextPage,
  prevPage,
  closeModal,
} = useRoleStore();

onMounted(async () => {
  await fetchPermissions();
});

watchEffect(async () => {
  await loadRoles();
})
</script>

<template>
  <div>
    <h1 class="title animate-fade-down">{{ $t("roles") }}</h1>
    <div class="w-[90%] mx-auto animate-fade-up">
      <div class="flex justify-between my-3">
        <router-link :to="{ name: 'create-role' }" class="create-btn">
          {{ $t("create") }}
        </router-link>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("name") }}</th>
            <th colspan="2">{{ $t("actions") }}</th>
          </tr>
        </thead>
        <tbody v-if="roles.length > 0">
          <tr v-for="role in roles" :key="role.id">
            <td>{{ role.id }}</td>
            <td>{{ role.name }}</td>
            <td>
              <router-link
                :to="{ name: 'roles-update', params: { id: role.id } }"
                class="update-btn"
              >
                {{ $t("update") }}
              </router-link>
            </td>
            <td>
              <form @submit.prevent="openConfirmDelete(role)">
                <button type="submit" class="delete-btn">
                  {{ $t("delete") }}
                </button>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination" v-if="lastPage > 1">
        <button
          class="primary-btn"
          @click.prevent="prevPage()"
          :disabled="currentPage <= 1"
        >
          {{ $t("previous") }}
        </button>
        <span class="mx-2"
          >{{ $t("page") }} {{ currentPage }} {{ $t("of") }} {{ lastPage }}</span
        >
        <button
          class="primary-btn"
          @click.prevent="nextPage()"
          :disabled="currentPage >= lastPage"
        >
          {{ $t("next") }}
        </button>
      </div>
    </div>
  </div>
  <ConfirmDelete :isVisible="isVisible" :onConfirm="deleteRole" :onCancel="closeModal" />
</template>
<style scoped></style>
