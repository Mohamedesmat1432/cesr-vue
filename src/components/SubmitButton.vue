<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "Submit",
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <button v-if="!loading" class="update-btn" type="submit">
    {{ label }}
  </button>
  <button v-else class="update-btn cursor-no-drop" disabled type="disabled">
    {{ label }}
  </button>
</template>
<style scoped></style>
