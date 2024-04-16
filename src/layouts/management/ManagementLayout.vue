<script setup lang="ts">
import ManagementHeader from './ManagementHeader.vue'
import ManagementFooter from './ManagementFooter.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <ManagementHeader></ManagementHeader>
    <RouterView></RouterView>
    <ManagementFooter></ManagementFooter>
  </div>
</template>
