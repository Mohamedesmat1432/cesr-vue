<script setup>
import { onMounted, reactive } from "vue";
import { useRoleStore } from "@/stores/roleStore";
import { storeToRefs } from "pinia";

const formData = reactive({
  name: "",
  permissions: [],
});

const { errors, loading, permissions } = storeToRefs(useRoleStore());
const { create, fetchPermissions } = useRoleStore();

onMounted(() => {
  errors.value = {};
  loading.value = false;
  fetchPermissions();
});
</script>

<template>
  <div>
    <h1 class="title animate-fade-down">{{ $t("create_role") }}</h1>

    <form @submit.prevent="create(formData)" class="form-data">
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
        <submit-button :label="$t('create')" :loading="loading" />
        <router-link :to="{ name: 'roles' }" class="dark-btn mx-1">
          {{ $t("back") }}
        </router-link>
      </div>
    </form>
  </div>
</template>
<style scoped></style>
