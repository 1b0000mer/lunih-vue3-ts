<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, RouterLink } from 'vue-router'

import AuthenticateService from '@/core/services/auth/authenticate.service'
import { UrlConstant } from '@/core/constants/url.constant'
import { toast } from 'vue-sonner'

const router = useRouter()
const { t } = useI18n()

const validated = ref(false)
const loading = ref(false)

const email = ref('')
const password = ref('')

const doLogin = (event: any) => {
  loading.value = true
  const form = event.currentTarget

  if (form.checkValidity() === false) {
    validated.value = true
    loading.value = false
  } else {
    AuthenticateService.doLoginForm({
      email: email.value,
      password: password.value
    }).then(
      (res) => {
        loading.value = false
        toast.success(t('WELCOME_MSG'))
        AuthenticateService.setAuthData(res.data)
        if (AuthenticateService.checkRoleAdmin()) {
          router.push(UrlConstant.ROUTE.MANAGEMENT.MANAGEMENT)
        } else {
          router.push(UrlConstant.ROUTE.MAIN.HOME)
        }
      },
      () => {
        loading.value = false
      }
    )
  }
}
</script>

<template>
  <div class="min-vh-80 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm noValidate :validated="validated" @submit.prevent="doLogin">
                  <h1>{{ t('LOG_IN') }}</h1>
                  <p class="text-body-secondary">{{ t('LOG_IN_BODY') }}</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cilUser" />
                    </CInputGroupText>
                    <CFormInput
                      required
                      :feedbackInvalid="t('USER_NAME_ERR')"
                      :placeholder="t('USER_NAME_TIP')"
                      autoComplete="off"
                      v-model="email"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cilLockLocked" />
                    </CInputGroupText>
                    <CFormInput
                      required
                      :feedbackInvalid="t('PASSWORD_ERR')"
                      type="password"
                      :placeholder="t('PASSWORD_TIP')"
                      autoComplete="off"
                      v-model="password"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol xs="6">
                      <CButton type="submit" color="primary" class="px-3">
                        <CSpinner
                          class="me-2"
                          as="span"
                          size="sm"
                          role="status"
                          :hidden="!loading"
                        ></CSpinner>
                        {{ t('LOG_IN') }}
                      </CButton>
                    </CCol>
                    <CCol xs="6" class="text-right">
                      <CButton color="link" class="px-0"> {{ t('FORGOR') }} </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>

            <CCard class="text-white bg-primary py-5" style="width: '44%'">
              <CCardBody class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                  </p>
                  <RouterLink to="/register">
                    <CButton color="primary" class="mt-3" active tabIndex="{-1}">
                      Register Now!
                    </CButton>
                  </RouterLink>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>
