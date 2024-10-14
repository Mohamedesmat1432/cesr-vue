<script setup>
const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  onConfirm: {
    type: Function,
    required: true,
  },
  onCancel: {
    type: Function,
    required: true,
  },
});
</script>
<template>
  <div v-if="isVisible" class="confirm-delete-modal-overlay" @click.self="onCancel">
    <div class="confirm-delete-modal">
      <h3 class="text-lg font-bold">{{ $t("confirm_deletion") }}</h3>
      <p class="mt-2">{{ $t("confirm_deletion_text") }}</p>
      <div class="flex justify-between mt-3">
        <button class="delete-btn" @click="onConfirm">{{ $t("delete") }}</button>
        <button class="dark-btn" @click="onCancel">{{ $t("cancel") }}</button>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
