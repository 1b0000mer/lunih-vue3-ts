import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'
import { UrlConstant } from './core/constants/url.constant'
import axios, { type InternalAxiosRequestConfig } from 'axios'
import AuthenticateService from './core/services/auth/authenticate.service'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { iconsSet as icons } from '@/assets/icons.js'

const app = createApp(App)

app.use(router)
app.provide('icons', icons)
app.mount('#app')

function addLanguageOnly(config: InternalAxiosRequestConfig<any>) {
  config.headers['Accept-Language'] = localStorage.getItem('language') === 'en' ? 'us' : 'lv'
  return config
}

function addLanguageAndToken(config: InternalAxiosRequestConfig<any>) {
  config = addLanguageOnly(config)
  config.headers.Authorization = `Bearer ${AuthenticateService.getAuthData().token}`
  return config
}
axios.interceptors.request.use((config) => {
  if (
    UrlConstant.PUBLIC_URL.some(
      (x) => x.method === config.method?.toUpperCase() && new RegExp(x.regex).test(config.url!)
    )
  ) {
    config = addLanguageOnly(config)
  } else if (AuthenticateService.getAuthData() !== null) {
    config = addLanguageAndToken(config)
  } else {
    config = addLanguageOnly(config)
  }
  return config
})
