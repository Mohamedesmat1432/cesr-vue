import { defineStore } from 'pinia'
import { header } from '@/header'

export const useLocaleStore = defineStore('localeStore', {
  state: () => ({
    locale: localStorage.getItem('locale') || 'en'
  }),
  actions: {
    async setLocale(locale) {
      this.locale = locale
      localStorage.setItem('locale', locale)
      await fetch('/api/set-locale', header('POST', null, { locale: locale }))
    }
  }
})
