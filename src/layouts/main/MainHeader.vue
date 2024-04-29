<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { CNavbar, CContainer, CNavbarBrand, CCollapse, CNavbarNav, CNavItem } from '@coreui/vue'
import { ref } from 'vue'

const visible = ref(false)
</script>
<template>
  <!-- <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/management">Management</RouterLink>
      </nav>
    </div>
  </header> -->
  <CNavbar expand="lg" className="bg-body-tertiary">
    <CContainer className="px-4" fluid>
      <CNavbarBrand href="../">LUNIH</CNavbarBrand>
      <CNavbarToggler @click="visible = !visible" />
      <CCollapse className="navbar-collapse" :visible="visible">
        <CNavbarNav className="d-none d-md-flex">
          <CNavItem>
            <RouterLink className="nav-link" to="/home">Home</RouterLink>
          </CNavItem>
          <CNavItem>
            <RouterLink className="nav-link" to="/about">About</RouterLink>
          </CNavItem>
          <CNavItem>
            <RouterLink className="nav-link" to="/management">Tempolary Management</RouterLink>
          </CNavItem>
        </CNavbarNav>
        <CNavbarNav className="ms-auto">
          <CNavItem>
            <RouterLink className="nav-link" to="/login">Login</RouterLink>
          </CNavItem>
        </CNavbarNav>
      </CCollapse>
    </CContainer>
  </CNavbar>
</template>
