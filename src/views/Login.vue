<script setup lang="ts">
// import { onBeforeMount } from 'vue'
// onBeforeMount(() => {})

import AuthenticateService from '@/core/services/auth/authenticate.service'
import { UrlConstant } from '@/core/constants/url.constant'
import { useRouter } from 'vue-router'
const router = useRouter()

let email = ''
let password = ''

const doLogin = () => {
  AuthenticateService.doLoginForm({ email, password }).then(
    (res) => {
      AuthenticateService.setAuthData(res.data)
      if (AuthenticateService.checkRoleAdmin()) {
        router.push(UrlConstant.ROUTE.MANAGEMENT.DASHBOARD)
      } else {
        router.push(UrlConstant.ROUTE.MAIN.HOME)
      }
    },
    (error) => {
      console.error(error)
    }
  )
}
</script>

<template>
  <div>
    <h1>Login time</h1>
    <form @submit.prevent>
      <label>Email:</label>
      <input type="email" placeholder="Email" v-model="email" />
      <label>Password:</label>
      <input type="password" placeholder="Password" v-model="password" />
      <button type="submit" @click="doLogin">Login</button>
    </form>
  </div>
</template>
