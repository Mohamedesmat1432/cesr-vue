<script setup>
import { watch } from "vue";
import { RouterView } from "vue-router";
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style scoped></style>
