<script setup lang="ts">
import AuthenticateService from '@/core/services/auth/authenticate.service'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const visible = ref(false)

const checkAuth = () => {
  if (AuthenticateService.checkRoleAdmin()) return true
  else return false
}
</script>
<template>
  <CNavbar expand="lg" class="bg-body-tertiary">
    <CContainer class="px-4" fluid>
      <CNavbarBrand href="../">LUNIH</CNavbarBrand>
      <CNavbarToggler @click="visible = !visible" />
      <CCollapse class="navbar-collapse" :visible="visible">
        <CNavbarNav class="d-none d-md-flex">
          <CNavItem>
            <RouterLink class="nav-link" to="/home">Home</RouterLink>
          </CNavItem>
          <CNavItem>
            <RouterLink class="nav-link" to="/about">About</RouterLink>
          </CNavItem>
          <CNavItem v-if="checkAuth()">
            <RouterLink class="nav-link" to="/management">Management</RouterLink>
          </CNavItem>
        </CNavbarNav>
        <CNavbarNav class="ms-auto">
          <CNavItem>
            <RouterLink class="nav-link" to="/login">Login</RouterLink>
          </CNavItem>
        </CNavbarNav>
      </CCollapse>
    </CContainer>
  </CNavbar>
</template>
