<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/management">Management</RouterLink>
      </nav>
    </div>
  </header>
</template>
