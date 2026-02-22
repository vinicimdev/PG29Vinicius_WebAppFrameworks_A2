import { ref, computed } from 'vue'
import { defineStore } from 'pinia' // Separate from vue. Used for storing information

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0) // Without ref you cannot change the value from somewhere else
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
