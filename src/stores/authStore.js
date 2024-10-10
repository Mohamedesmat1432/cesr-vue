import { defineStore } from 'pinia'
import { header } from '@/header'
import { useToast } from 'vue-toastification'
import { trans } from '@/i18n/translate'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    toast: useToast(),
    errorMessage: trans('network_error'),
    user: null,
    errors: {},
    loading: false
  }),
  actions: {
    /******************* Get authenticated user *******************/
    async getUser() {
      try {
        this.loading = true
        if (this.token) {
          const res = await fetch('/api/user', header('GET', this.token))
          if (res.status === 500) {
            throw new Error(this.errorMessage)
          }

          const data = await res.json()
          if (res.status === 200) {
            this.user = data.user
          }
        }
      } catch (err) {
        this.toast.error(err.message)
      } finally {
        this.loading = false
      }
    },
    /******************* Login or Register user *******************/
    async authenticate(apiRoute, formData) {
      try {
        this.loading = true
        const res = await fetch(`/api/${apiRoute}`, header('POST', this.token, formData))
        if (res.status === 500) {
          throw new Error(this.errorMessage)
        }

        const data = await res.json()
        if (res.status === 200) {
          this.user = data.user
          this.token = data.token
          localStorage.setItem('token', this.token)
          this.router.push({ name: 'home' })
          this.toast.success(data.message)
        } else {
          this.errors = data.errors
        }
      } catch (err) {
        console.log(err.message)
        this.toast.error(err.message)
      } finally {
        this.loading = false
      }
    },
    /******************* Logout user *******************/
    async logout() {
      try {
        this.loading = true
        const res = await fetch('/api/logout', header('POST', this.token))
        if (res.status === 500) {
          throw new Error(this.errorMessage)
        }

        const data = await res.json()
        if (res.status === 200) {
          this.errors = {}
          this.user = null
          this.token = null
          localStorage.removeItem('token')
          this.router.push({ name: 'home' })
          this.toast.success(data.message)
        }
      } catch (err) {
        this.toast.error(err.message)
      } finally {
        this.loading = false
      }
    }
  },
  getters: {}
})
