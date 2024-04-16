<script setup lang="ts">
import ManagementHeader from './ManagementHeader.vue'
import ManagementFooter from './ManagementFooter.vue'
</script>

<template>
  <div>
    <ManagementHeader></ManagementHeader>
    <div class="main-page">
      <RouterView></RouterView>
    </div>
    <ManagementFooter></ManagementFooter>
  </div>
</template>
<style scoped>
@media (min-width: 1024px) {
  .main-page {
    min-height: 90vh;
    min-width: 150vh;
    display: flex;
    align-items: center;
  }
}
</style>
