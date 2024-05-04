<script setup lang="ts">
import { RouterView } from 'vue-router'

import MainHeader from './MainHeader.vue'
import MainFooter from './MainFooter.vue'
</script>

<template>
  <div class="wrapper d-flex flex-column min-vh-100">
    <MainHeader />
    <div class="body flex-grow-1">
      <CContainer class="px-4" lg>
        <Suspense>
          <template #default>
            <RouterView />
          </template>
          <template #fallback>
            <CSpinner color="primary" />
          </template>
        </Suspense>
      </CContainer>
    </div>
    <MainFooter />
  </div>
</template>
