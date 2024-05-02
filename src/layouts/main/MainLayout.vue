<script setup lang="ts">
import MainHeader from './MainHeader.vue'
import MainFooter from './MainFooter.vue'
import { RouterView } from 'vue-router'

import { CContainer } from '@coreui/vue'
</script>

<template>
  <div class="wrapper d-flex flex-column min-vh-100">
    <MainHeader />
    <div class="body flex-grow-1">
      <CContainer class="px-4" lg>
        <RouterView />
      </CContainer>
    </div>
    <MainFooter />
  </div>
</template>
