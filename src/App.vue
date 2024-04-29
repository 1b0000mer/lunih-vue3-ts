<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useStore } from 'vuex'
import { CButton, useColorModes } from '@coreui/vue'
import { onBeforeMount } from 'vue'

const store = useStore()
const { isColorModeSet, setColorMode } = useColorModes('coreui-free-vue-admin-template-theme')

onBeforeMount(() => {
  const urlParams = new URLSearchParams(window.location.href.split('?')[1])
  const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
  if (theme) {
    setColorMode(theme)
    return
  }

  if (isColorModeSet()) {
    return
  }

  setColorMode(store.state.theme)
})
</script>

<template>
  <CButton></CButton>
  <RouterView />
</template>

<style lang="scss">
@import '/src/scss/style.scss';
</style>
