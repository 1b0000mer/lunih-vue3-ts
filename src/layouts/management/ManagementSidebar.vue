<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

// @ts-ignore
import { AppSidebarNav } from '@/components/AppSidebarNav.js'

// @ts-ignore
import { logo } from '@/assets/brand/logo'
// @ts-ignore
import { sygnet } from '@/assets/brand/sygnet'

const store = useStore()
const sidebarUnfoldable = computed(() => store.state.sidebarUnfoldable)
const sidebarVisible = computed(() => store.state.sidebarVisible)
</script>
<template>
  <CSidebar
    class="border-end"
    position="fixed"
    :unfoldable="sidebarUnfoldable"
    :visible="sidebarVisible"
    @visible-change="
      (event: any) =>
        store.commit({
          type: 'updateSidebarVisible',
          value: event
        })
    "
  >
    <CSidebarHeader class="border-bottom">
      <RouterLink custom to="/" v-slot="{ href, navigate }">
        <CSidebarBrand v-bind="$attrs" as="a" :href="href" @click="navigate">
          <CIcon custom-class-name="sidebar-brand-full" :icon="logo" :height="32" />
          <CIcon custom-class-name="sidebar-brand-narrow" :icon="sygnet" :height="32" />
        </CSidebarBrand>
      </RouterLink>
      <CCloseButton
        class="d-lg-none"
        dark
        @click="
          (event: any) =>
            store.commit({
              type: 'updateSidebarVisible',
              value: event
            })
        "
      />
    </CSidebarHeader>

    <AppSidebarNav />

    <CSidebarFooter class="border-top d-none d-lg-flex">
      <CSidebarToggler @click="store.commit('toggleUnfoldable')" />
    </CSidebarFooter>
  </CSidebar>
</template>
