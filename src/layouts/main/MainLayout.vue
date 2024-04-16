<script setup lang="ts">
import MainHeader from './MainHeader.vue'
import MainFooter from './MainFooter.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <MainHeader></MainHeader>
    <RouterView></RouterView>
    <MainFooter></MainFooter>
  </div>
</template>
