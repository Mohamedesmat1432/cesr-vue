import { defineStore } from 'pinia'
import axios from 'axios'

export const useChatStore = defineStore('chatStore', {
  state: () => ({
    messages: [],
    loading: false,
    error: null
  }),
  actions: {
    async sendMessage(message) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post('/api/chat-gpt', { message })
        const reply = response.data.choices[0].message.content
        this.messages.push({ role: 'user', content: message })
        this.messages.push({ role: 'assistant', content: reply })
      } catch (error) {
        this.error = 'Failed to send message'
      } finally {
        this.loading = false
      }
    }
  }
})
