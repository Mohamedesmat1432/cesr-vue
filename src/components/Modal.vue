<script setup>
import { computed } from "vue";
import { useModalStore } from "@/stores/modalStore";

const modalStore = useModalStore();

const isOpen = computed(() => modalStore.isOpen);
const content = computed(() => modalStore.content);
const close = () => modalStore.close();
</script>
<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <button class="modal-close" @click="close">×</button>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  max-width: 500px;
  width: 100%;
}
.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  font-size: 24px;
  cursor: pointer;
  font-weight: bold;
}
</style>
