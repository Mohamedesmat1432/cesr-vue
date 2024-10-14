<script setup>
import { ref, watch } from "vue";
import { useModalStore } from "@/stores/modalStore";
import Modal from "@/components/Modal.vue";

const modalStore = useModalStore();
const openModal = () => modalStore.open();
navigator.getBattery().then((battery) => {
  console.log(battery.level * 100 + "%");
});
</script>

<template>
  <main class="w-[90%] mx-auto">
    <h1 class="title animate-fade-down space-y-6">{{ $t("welcome") }}</h1>
    <button @click="openModal()">Open Modal</button>
    <modal> {{ $t("welcome") }} </modal>
  </main>
</template>

<style scoped>
.v-enter-from {
  opacity: 0;
}

.v-enter-to {
  opacity: 1;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-leave-from {
  opacity: 1;
}

.v-leave-to {
  opacity: 0;
}
</style>
