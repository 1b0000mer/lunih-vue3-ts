<script setup lang="ts">
import { onBeforeMount, reactive, ref, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { toast } from 'vue-sonner'

import ProgramService from '@/core/services/management/program.service'
import { SystemConstant } from '@/core/constants/system.constant'
import type { Faculty } from '@/core/models/categories/faculty.model'
import FacultyService from '@/core/services/management/faculty.service'
import type { Industry } from '@/core/models/categories/industry.model'
import IndustryService from '@/core/services/management/industry.service'
import { CTableDataCell } from '@coreui/vue'

const { locale, t } = useI18n()
const emit = defineEmits(['closeModal'])
const props = defineProps(['modalData'])

const programForm = reactive(
  props.modalData?.data || {
    nameEn: '',
    nameLv: '',
    studyLevel: '',
    facultyID: '',
    industryList: []
  }
)
const listFaculty: Ref<Faculty[]> = ref([])
const listIndustry: Ref<Industry[]> = ref([])
const searchValue = ref('')

const validated = ref(false)
const loading = ref(false)
const visible = ref(false)

onBeforeMount(() => {
  fetchFacultyList()
  fetchIndustryList()
})

const fetchFacultyList = () => {
  FacultyService.getAll().then((res) => {
    listFaculty.value = res.data
  })
}
const fetchIndustryList = () => {
  IndustryService.getAllPaging(0, 5, searchValue.value).then((res) => {
    listIndustry.value = res.data.content
  })
}

const onSubmit = (event: any) => {
  loading.value = true
  const form = event.currentTarget

  if (form.checkValidity() === false) {
    validated.value = true
    loading.value = false
  } else {
    if (props.modalData.action === SystemConstant.ACTION.EDIT) {
      ProgramService.update(props.modalData.data.id, programForm).then(
        () => {
          emit('closeModal', true)
          toast.success(t('MSG_UPDATE_DONE'))
        },
        () => (loading.value = false)
      )
    } else {
      ProgramService.create(programForm).then(
        () => {
          emit('closeModal', true)
          toast.success(t('MSG_CREATE_DONE'))
        },
        () => (loading.value = false)
      )
    }
  }
}
</script>
<template>
  <CModalHeader>
    <CModalTitle>{{ modalData.title }}</CModalTitle>
  </CModalHeader>
  <CForm class="modal-body" noValidate :validated="validated" @submit.prevent="onSubmit">
    <div class="mb-3">
      <CFormInput
        :label="t('PROGRAM_NAME_EN')"
        v-model="programForm.nameEn"
        :feedbackInvalid="t('CAN_NOT_BE_EMPTY')"
        required
      />
    </div>
    <div class="mb-3">
      <CFormInput
        v-model="programForm.nameLv"
        :label="t('PROGRAM_NAME_LV')"
        :feedbackInvalid="t('CAN_NOT_BE_EMPTY')"
        required
      />
    </div>
    <div class="mb-3">
      <CFormSelect
        v-model="programForm.studyLevel"
        :label="t('CHOOSE_STUDY_LEVEL')"
        :feedbackInvalid="t('CAN_NOT_BE_EMPTY')"
        required
      >
        <option value="LEVEL_BACHELOR">{{ t('BACHELOR') }}</option>
        <option value="LEVEL_MASTER">{{ t('MASTER') }}</option>
        <option value="LEVEL_DOCTORAL">{{ t('DOCTORAL') }}</option>
      </CFormSelect>
    </div>
    <div class="mb-3">
      <CFormSelect
        v-model="programForm.facultyID"
        :label="t('CHOOSE_FACULTY')"
        :feedbackInvalid="t('CAN_NOT_BE_EMPTY')"
        required
      >
        <option v-for="faculty in listFaculty" :key="faculty.id" :value="faculty.id">
          {{ locale === 'EN' ? faculty.nameEn : faculty.nameLv }}
        </option>
      </CFormSelect>
    </div>
    <div class="mb-3 d-grid">
      <CButton variant="outline" color="info" @click="visible = !visible">{{
        t('CHOOSE_INDUSTRY')
      }}</CButton>
      <CCollapse :visible="visible">
        <CCard class="mt-3">
          <CCardHeader>
            <CRow>
              <CInputGroup>
                <CFormInput
                  v-model="searchValue"
                  :placeholder="t('SEARCH')"
                  aria-label="Search field"
                  aria-describedby="btnSearch"
                />
                <CButton
                  @click="fetchIndustryList"
                  type="button"
                  color="secondary"
                  variant="outline"
                  id="btnSearch"
                >
                  <CIcon icon="cilMagnifyingGlass" />
                </CButton>
              </CInputGroup>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">{{
                    locale === 'EN' ? t('INDUSTRY_NAME_EN') : t('INDUSTRY_NAME_LV')
                  }}</CTableHeaderCell>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="(industry, index) in listIndustry" :key="index">
                  <CTableDataCell
                    ><CFormCheck
                      :value="industry.id"
                      :label="locale === 'EN' ? industry.nameEn : industry.nameLv"
                      v-model="programForm.industryList"
                  /></CTableDataCell>
                  <CTableHeaderCell scope="row">{{ industry.id }}</CTableHeaderCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCollapse>
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
