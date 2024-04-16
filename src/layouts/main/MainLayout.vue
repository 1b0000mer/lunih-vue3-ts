<script setup lang="ts">
import MainHeader from './MainHeader.vue'
import MainFooter from './MainFooter.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <MainHeader></MainHeader>
    <div class="main-page">
      <RouterView></RouterView>
    </div>
    <MainFooter></MainFooter>
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
