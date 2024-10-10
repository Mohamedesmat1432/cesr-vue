<script setup>
import { onMounted, reactive } from 'vue'
import { usePermissionStore } from '@/stores/permissionStore'
import { storeToRefs } from 'pinia'

const formData = reactive({
  name: ''
})

const { errors, loading } = storeToRefs(usePermissionStore())
const { create } = usePermissionStore()

onMounted(() => {
  errors.value = {}
  loading.value = false
})
</script>

<template>
  <div>
    <h1 class="title animate-fade-down">{{ $t('create_permission') }}</h1>

    <form @submit.prevent="create(formData)" class="form-data">
      <div>
        <label for="name">{{ $t('name') }}</label>
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
      <div class="flex animate-fade-up">
        <submit-button :label="$t('create')" :loading="loading" />
        <router-link :to="{ name: 'permissions' }" class="dark-btn mx-1">
          {{ $t('back') }}
        </router-link>
      </div>
    </form>
  </div>
</template>
<style scoped></style>
