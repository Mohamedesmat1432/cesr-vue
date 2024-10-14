<script setup>
import { ref } from "vue";
import { useChatStore } from "@/stores/chatgptStore";

const chatStore = useChatStore();
const message = ref("");

const send = () => {
  chatStore.sendMessage(message.value);
  message.value = "";
};
</script>
<template>
  <div>
    <div v-for="msg in chatStore.messages" :key="msg.content">
      <strong>{{ msg.role }}:</strong> {{ msg.content }}
    </div>
    <input v-model="message" @keyup.enter="send" placeholder="Type a message..." />
    <button @click="send">Send</button>
    <div v-if="chatStore.loading">Loading...</div>
    <div v-if="chatStore.error">{{ chatStore.error }}</div>
  </div>
</template>
