<script setup lang="ts">
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavItem,
  CNavLink,
  useColorModes
} from '@coreui/vue'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import CIcon from '@coreui/icons-vue'

const store = useStore()
const { locale, t } = useI18n()
const { colorMode, setColorMode } = useColorModes('coreui-free-vue-admin-template-theme')

const switchLang = (langCode: string) => {
  localStorage.setItem('language', langCode)
  locale.value = langCode
}
const headerClassNames = ref('mb-4 p-0')
onMounted(() => {
  document.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 0) {
      headerClassNames.value = 'mb-4 p-0 shadow-sm'
    } else {
      headerClassNames.value = 'mb-4 p-0'
    }
  })
})
</script>
<template>
  <!-- <div class="wrapper">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/management">Dashboard</RouterLink>
      <RouterLink to="/management/categories/faculty">Faculty</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/logout">Logout</RouterLink>
    </nav>
  </div> -->
  <CHeader position="sticky" :class="headerClassNames">
    <CContainer class="border-bottom px-4" fluid>
      <CHeaderToggler @click="store.commit('toggleSidebar')" style="margin-inline-start: '-14px'">
        <CIcon icon="cilMenu" size="lg" />
      </CHeaderToggler>
      <CHeaderNav class="d-none d-md-flex">
        <CNavItem>
          <CNavLink to="/management"> {{ t('CATEGORIES') }} </CNavLink>
        </CNavItem>
      </CHeaderNav>
      <CHeaderNav class="ms-auto">
        <CNavItem>
          <CNavLink href="#">
            <CIcon icon="cilBell" size="lg" />
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">
            <CIcon icon="cilList" size="lg" />
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">
            <CIcon icon="cilEnvelopeOpen" size="lg" />
          </CNavLink>
        </CNavItem>
      </CHeaderNav>
      <CHeaderNav>
        <li class="nav-item py-1">
          <div class="vr h-100 mx-2 text-body text-opacity-75"></div>
        </li>
        <CDropdown variant="nav-item" placement="bottom-end">
          <CDropdownToggle :caret="false">
            <CIcon v-if="colorMode === 'dark'" icon="cilMoon" size="lg" />
            <CIcon v-else-if="colorMode === 'light'" icon="cilSun" size="lg" />
            <CIcon v-else icon="cilContrast" size="lg" />
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem
              :active="colorMode === 'light'"
              class="d-flex align-items-center"
              component="button"
              type="button"
              @click="setColorMode('light')"
              ><CIcon class="me-2" icon="cilSun" size="lg" /> Light
            </CDropdownItem>
            <CDropdownItem
              :active="colorMode === 'dark'"
              class="d-flex align-items-center"
              component="button"
              type="button"
              @click="setColorMode('dark')"
              ><CIcon class="me-2" icon="cilMoon" size="lg" /> Dark
            </CDropdownItem>
            <CDropdownItem
              :active="colorMode === 'auto'"
              class="d-flex align-items-center"
              component="button"
              type="button"
              @click="setColorMode('auto')"
              ><CIcon class="me-2" icon="cilContrast" size="lg" /> Auto
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
        <CDropdown variant="nav-item" placement="bottom-end">
          <CDropdownToggle :caret="false">
            <CIcon v-if="locale === 'EN'" icon="cifUs" size="lg" />
            <CIcon v-else icon="cifLv" size="lg" />
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem
              :active="locale === 'EN'"
              class="d-flex align-items-center"
              component="button"
              type="button"
              @click="switchLang('EN')"
              ><CIcon class="me-2" icon="cifUs" size="lg" /> English
            </CDropdownItem>

            <CDropdownItem
              :active="locale === 'LV'"
              class="d-flex align-items-center"
              component="button"
              type="button"
              @click="switchLang('LV')"
              ><CIcon class="me-2" icon="cifLv" size="lg" /> Laviski
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
        <li class="nav-item py-1">
          <div class="vr h-100 mx-2 text-body text-opacity-75"></div>
        </li>
        <!-- <AppHeaderDropdown /> -->
      </CHeaderNav>
    </CContainer>
    <CContainer class="px-4" fluid>
      <!-- <AppBreadcrumb /> -->
    </CContainer>
  </CHeader>
</template>
