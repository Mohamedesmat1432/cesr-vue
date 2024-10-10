<script setup>
import { onMounted, reactive } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'

const formData = reactive({
  email: '',
  password: ''
})

const { errors, loading } = storeToRefs(useAuthStore())
const { authenticate } = useAuthStore()

onMounted(() => {
  errors.value = {}
  loading.value = false
})
</script>

<template>
  <div>
    <h1 class="title animate-fade-down">{{ $t('login_account') }}</h1>

    <form @submit.prevent="authenticate('login', formData)" class="form-data">
      <div>
        <label for="email">{{ $t('email') }}</label>
        <input
          type="email"
          v-model="formData.email"
          id="email"
          :placeholder="$t('placeholder_email')"
        />
        <div class="error" v-if="errors.email">{{ errors.email[0] }}</div>
      </div>

      <div>
        <label for="password">{{ $t('password') }}</label>
        <input
          type="password"
          v-model="formData.password"
          id="password"
          :placeholder="$t('placeholder_password')"
        />
        <div class="error" v-if="errors.password">{{ errors.password[0] }}</div>
      </div>

      <div>
        <submit-button :label="$t('login')" :loading="loading" />
      </div>
    </form>
  </div>
</template>
<style scoped></style>
