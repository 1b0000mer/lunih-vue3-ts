import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'

import axios, { type InternalAxiosRequestConfig } from 'axios'
import './scss/style.scss'
import { iconsSet as icons } from './assets/icons'

import EN from './locale/en.json'
import LV from './locale/lv.json'

import { UrlConstant } from './core/constants/url.constant'
import AuthenticateService from './core/services/auth/authenticate.service'
import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
// @ts-ignore
import store from './store'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('language') || 'EN',
  fallbackLocale: 'EN',
  messages: {
    EN: EN,
    LV: LV
  }
})
const app = createApp(App)

app.use(store)
app.use(i18n)
app.use(router)
app.use(CoreuiVue)
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.mount('#app')

function addLanguageOnly(config: InternalAxiosRequestConfig<any>) {
  config.headers['Accept-Language'] = i18n.global.locale.value
  return config
}

function addLanguageAndToken(config: InternalAxiosRequestConfig<any>) {
  config = addLanguageOnly(config)
  config.headers.Authorization = `Bearer ${AuthenticateService.getAuthData().token}`
  return config
}

//interceptors
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
