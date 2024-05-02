<script setup lang="ts">
import ManagementHeader from './ManagementHeader.vue'
import ManagementFooter from './ManagementFooter.vue'
import ManagementSidebar from './ManagementSidebar.vue'
</script>

<template>
  <div>
    <ManagementSidebar />
    <div class="wrapper d-flex flex-column min-vh-100">
      <ManagementHeader />
      <div class="body flex-grow-1">
        <CContainer class="px-4" lg>
          <RouterView />
        </CContainer>
      </div>
      <ManagementFooter />
    </div>
  </div>
</template>
