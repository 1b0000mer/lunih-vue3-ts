import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import axios, { type InternalAxiosRequestConfig } from 'axios'
import { iconsSet as icons } from './assets/icons'

import { UrlConstant } from './core/constants/url.constant'
import AuthenticateService from './core/services/auth/authenticate.service'
import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { createStore } from 'vuex'

//store
const store = createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
    theme: 'dark'
  },
  mutations: {
    toggleSidebar(state: any) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state: any) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state: any, payload: any) {
      state.sidebarVisible = payload.value
    }
  },
  actions: {},
  modules: {}
})

const app = createApp(App)

app.use(store)
app.use(router)
app.use(CoreuiVue)
app.provide('icons', icons)
app.component('CIcon', CIcon)
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
