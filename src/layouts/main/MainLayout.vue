<script setup lang="ts">
import MainHeader from './MainHeader.vue'
import MainFooter from './MainFooter.vue'
import { RouterView } from 'vue-router'

import { CContainer } from '@coreui/vue'
</script>

<template>
  <div className="wrapper d-flex flex-column min-vh-100">
    <MainHeader />
    <div className="body flex-grow-1">
      <CContainer className="px-4" lg>
        <RouterView />
      </CContainer>
    </div>
    <MainFooter />
  </div>
  <!-- <div>
    <MainHeader></MainHeader>
    <div class="main-page">
      <RouterView></RouterView>
    </div>
    <MainFooter></MainFooter>
  </div> -->
</template>
