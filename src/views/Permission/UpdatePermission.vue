<script setup>
import { onMounted, reactive, ref } from 'vue'
import { usePermissionStore } from '@/stores/permissionStore'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

const route = useRoute()

const permission = ref(null)
const formData = reactive({
  name: ''
})

const { errors, loading } = storeToRefs(usePermissionStore())
const { update, show } = usePermissionStore()

onMounted(async () => {
  permission.value = await show(route.params.id)
  formData.name = permission.value.name
  errors.value = {}
  loading.value = false
})
</script>

<template>
  <div>
    <h1 class="title animate-fade-down">{{ $t('update_permission') }}</h1>

    <form @submit.prevent="update(permission.id, formData)" class="form-data">
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
        <submit-button :label="$t('update')" :loading="loading" />
        <router-link :to="{ name: 'permissions' }" class="dark-btn mx-1">
          {{ $t('back') }}
        </router-link>
      </div>
    </form>
  </div>
</template>
<style scoped></style>
