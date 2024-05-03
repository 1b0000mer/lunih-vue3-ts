<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { toast } from 'vue-sonner'

import IndustryService from '@/core/services/management/industry.service'
import type { Industry } from '@/core/models/categories/industry.model'
import { SystemConstant } from '@/core/constants/system.constant'

const { t } = useI18n()
const emit = defineEmits(['closeModal'])
const props = defineProps(['modalData'])

const industryForm: Industry = reactive({
  nameEn: props.modalData?.data?.nameEn || '',
  nameLv: props.modalData?.data?.nameLv || ''
})
const validated = ref(false)
const loading = ref(false)

const onSubmit = (event: any) => {
  loading.value = true
  const form = event.currentTarget

  if (form.checkValidity() === false) {
    validated.value = true
    loading.value = false
  } else {
    if (props.modalData.action === SystemConstant.ACTION.EDIT) {
      IndustryService.update(props.modalData.data.id, industryForm).then(() => {
        emit('closeModal', true)
        toast.success(t('MSG_UPDATE_DONE'))
      })
    } else {
      IndustryService.create(industryForm).then(() => {
        emit('closeModal', true)
        toast.success(t('MSG_CREATE_DONE'))
      })
    }
  }
}
</script>
<template>
  <CModalHeader>
    <CModalTitle>{{ modalData.title }}</CModalTitle>
  </CModalHeader>
  <CForm class="modal-body" noValidate :validated="validated" @submit.prevent="onSubmit">
    <div class="mb-3 pad-form">
      <CFormInput
        :label="t('INDUSTRY_NAME_EN')"
        v-model="industryForm.nameEn"
        :feedbackInvalid="t('CAN_NOT_BE_EMPTY')"
        required
      />
    </div>
    <div class="mb-3 pad-form">
      <CFormInput
        v-model="industryForm.nameLv"
        :label="t('INDUSTRY_NAME_LV')"
        :feedbackInvalid="t('CAN_NOT_BE_EMPTY')"
        required
      />
    </div>
    <CModalFooter>
      <CButton color="secondary" @click="$emit('closeModal', false)">{{ t('CANCEL') }}</CButton>
      <CButton color="primary" type="submit" :disabled="loading">
        <CSpinner class="me-2" as="span" size="sm" role="status" :hidden="!loading" />
        {{ t('CONFIRM') }}
      </CButton>
    </CModalFooter>
  </CForm>
</template>

<style scoped>
.pad-form {
  padding: 10px;
}
</style>
