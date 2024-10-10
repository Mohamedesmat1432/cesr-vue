import { defineStore } from 'pinia'

export const useModalStore = defineStore('modalStore', {
  state: () => ({
    isOpen: false
  }),
  actions: {
    open() {
      this.isOpen = true
    },
    close() {
      this.isOpen = false
    }
  }
})
