<script setup>
import { ref } from 'vue'
let displayError = ref(true)
const props = defineProps(['errorMsg'])
</script>
<template>
  <div v-if="displayError">
    <small class="text-red">
      {{ errorMsg }}
    </small>
  </div>
</template>
<style scoped>
.text-red {
  color: #f44336;
}
</style>
