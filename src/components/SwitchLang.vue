<script setup>
import { watchEffect } from 'vue'
import { useLocaleStore } from '@/stores/localeStore'

const localeStore = useLocaleStore()
const html = document.querySelector('html')
const changeLang = (locale) => {
  localeStore.setLocale(locale)
}
watchEffect(() => {
  html.setAttribute('dir', localeStore.locale === 'en' ? 'ltr' : 'rtl')
  html.setAttribute('lang', localeStore.locale)
})
</script>
<template>
  <select @change="changeLang($event.target.value)" v-model="$i18n.locale" id="locale">
    <option v-for="locale in $i18n.availableLocales" :value="locale" :key="locale">
      {{ locale }}
    </option>
  </select>
</template>

<style scoped>
/* label,
select {
  width: 100%;
}
select {
  height: 25px;
} */
</style>
