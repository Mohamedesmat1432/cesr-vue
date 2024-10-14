<script setup>
import { computed, onMounted, reactive } from "vue";
import { usePermissionStore } from "@/stores/permissionStore";
import { storeToRefs } from "pinia";
import ConfirmDelete from "@/components/ConfirmDelete.vue";

const { permissions, currentPage, lastPage, isVisible } = storeToRefs(
  usePermissionStore()
);
const {
  loadPermissions,
  openConfirmDelete,
  deletePermission,
  nextPage,
  prevPage,
  closeModal,
} = usePermissionStore();

onMounted(async () => await loadPermissions());
</script>

<template>
  <div>
    <h1 class="title animate-fade-down">{{ $t("permissions") }}</h1>
    <div class="w-[90%] mx-auto animate-fade-up">
      <div class="flex justify-between my-3">
        <router-link :to="{ name: 'create-permission' }" class="create-btn">
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
        <tbody v-if="permissions.length > 0">
          <tr v-for="permission in permissions" :key="permission.id">
            <td>{{ permission.id }}</td>
            <td>{{ permission.name }}</td>
            <td>
              <router-link
                :to="{ name: 'permissions-update', params: { id: permission.id } }"
                class="update-btn"
              >
                {{ $t("update") }}
              </router-link>
            </td>
            <td>
              <form @submit.prevent="openConfirmDelete(permission)">
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
  <ConfirmDelete
    :isVisible="isVisible"
    :onConfirm="deletePermission"
    :onCancel="closeModal"
  />
</template>
<style scoped></style>
