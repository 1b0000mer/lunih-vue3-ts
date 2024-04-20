<script setup lang="ts">
import {
  CRow,
  CCol,
  CButton,
  CFormLabel,
  CFormInput,
  CModalHeader,
  CModalFooter,
  CForm,
  CModalTitle
} from '@coreui/vue'
import { reactive } from 'vue'
import FacultyService from '@/core/services/management/faculty.service'
import type { Faculty } from '@/core/models/categories/faculty.model'
import { SystemConstant } from '@/core/constants/system.constant'

const emit = defineEmits(['closeModal'])
const props = defineProps(['modalData'])

let form: Faculty = reactive({
  nameEn: props.modalData?.data?.nameEn || '',
  nameLv: props.modalData?.data?.nameLv || ''
})

function onSubmit() {
  if (props.modalData.action === SystemConstant.ACTION.EDIT) {
    FacultyService.update(props.modalData.data.id, form).then(() => {
      emit('closeModal', true)
      alert('update success!')
    })
  } else {
    FacultyService.create(form).then(
      () => {
        emit('closeModal', true)
        alert('create success!')
      },
      (error) => {
        alert('something wrong: ' + error.response.data.message)
      }
    )
  }
}
</script>
<template>
  <!-- <div> -->
  <CModalHeader>
    <CModalTitle>{{ modalData?.title }}</CModalTitle>
  </CModalHeader>
  <CForm :validated="true">
    <div class="mb-3 pad-form">
      <CFormInput
        label="Faculty English Name (*)"
        v-model="form.nameEn"
        feedbackInvalid="This field can not be empty!"
        required
      />
    </div>
    <div class="mb-3 pad-form">
      <CFormInput
        v-model="form.nameLv"
        label="Faculty Latvian Name (*)"
        feedbackInvalid="This field can not be empty!"
        required
      />
    </div>
  </CForm>
  <CModalFooter>
    <CButton @click="$emit('closeModal', false)">Cancel</CButton>
    <CButton @click="onSubmit" :disabled="!form.nameEn || !form.nameLv">Submit</CButton>
  </CModalFooter>
  <!-- </div> -->
</template>

<style scoped>
.pad-form {
  padding: 10px;
}
</style>
