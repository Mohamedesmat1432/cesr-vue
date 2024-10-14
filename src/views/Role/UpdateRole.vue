<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoleStore } from "@/stores/roleStore";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const route = useRoute();

const formData = reactive({
  name: "",
  permissions: [],
});

const { errors, loading, role, permissions, selectedPermissions } = storeToRefs(
  useRoleStore()
);
const { update, show, fetchPermissions } = useRoleStore();

onMounted(async () => {
  await show(route.params.id);
  await fetchPermissions();
  formData.name = role.value.name;
  formData.permissions = selectedPermissions.value;
  errors.value = {};
  loading.value = false;
});
</script>

<template>
  <div>
    <h1 class="title animate-fade-down">{{ $t("update_role") }}</h1>

    <form @submit.prevent="update(role.id, formData)" class="form-data">
      <div>
        <label for="name">{{ $t("name") }}</label>
        <input
          type="text"
          v-model="formData.name"
          id="name"
          :placeholder="$t('placeholder_name')"
          required
          autofocus
        />
        <div class="error" v-if="errors.name">{{ errors.name[0] }}</div>
      </div>
      <div>
        <div v-for="permission in permissions" :key="permission.id">
          <label>
            <input
              type="checkbox"
              :value="permission.name"
              v-model="formData.permissions"
            />
            {{ permission.name }}
          </label>
        </div>
        <div class="error" v-if="errors.permissions">{{ errors.permissions[0] }}</div>
      </div>
      <div class="flex animate-fade-up">
        <submit-button :label="$t('update')" :loading="loading" />
        <router-link :to="{ name: 'roles' }" class="dark-btn mx-1">
          {{ $t("back") }}
        </router-link>
      </div>
    </form>
  </div>
</template>
<style scoped></style>
