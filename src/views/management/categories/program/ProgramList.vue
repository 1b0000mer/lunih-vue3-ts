<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'

// @ts-ignore
import ProgramService from '@/core/services/management/program.service'

import ProgramForm from './ProgramForm.vue'
// @ts-ignore
import AppPaginate from '@/components/AppPaginate.vue'
import { Paginate } from '@/core/models/paginate.model'

import { Program } from '@/core/models/categories/program.model'
import { ModalData } from '@/core/models/common/modal-data.model'
import { SystemConstant } from '@/core/constants/system.constant'
import type { PagedResults } from '@/core/models/common/response-page.model'
import type { AxiosResponse } from 'axios'

const { locale, t } = useI18n()
const listProgram = ref(new Paginate<Program>())
const searchValue = ref('')
const showModal = ref(false)
const modalData: ModalData<Program> = new ModalData<Program>()

onBeforeMount(() => {
  getDataPaging()
})

const getDataPaging = (isSearch?: string) => {
  if (isSearch) listProgram.value.currentPage = 1
  ProgramService.getAllPaging(
    listProgram.value.currentPage - 1,
    listProgram.value.limit,
    searchValue.value
  ).then((res: AxiosResponse<PagedResults<Program>>) => {
    const response = res.data
    listProgram.value.currentPage = response.pageable.pageNumber + 1
    listProgram.value.limit = response.pageable.pageSize
    listProgram.value.totalPage = response.totalPages
    listProgram.value.totalItem = response.totalElements
    listProgram.value.data = response.content
  })
}

const doSearch = () => {
  getDataPaging(searchValue.value)
}

const pageChange = (page: Paginate<Program>) => {
  listProgram.value = page
  getDataPaging()
}

const onOpenModal = (data?: Program) => {
  if (data) {
    ;(modalData.title = t('EDIT_TITLE')), (modalData.action = SystemConstant.ACTION.EDIT)
    modalData.data = data
  } else {
    modalData.title = t('ADD_TITLE')
    modalData.data = undefined
    modalData.action = SystemConstant.ACTION.ADD
  }
  showModal.value = true
}

const onCloseModal = (isRefresh?: boolean) => {
  if (isRefresh) {
    getDataPaging()
  }
  showModal.value = false
}

const onChangeStatus = (id: number) => {
  if (confirm(t('CONFIRM_CHANGE_STATUS'))) {
    ProgramService.changeStatus(id).then(() => {
      toast.success(t('MSG_CHANGE_DONE'))
      getDataPaging()
    })
  }
}

const onDelete = (id: number) => {
  if (confirm(t('CONFIRM_DELETE'))) {
    ProgramService.delete(id).then(() => {
      toast.success(t('MSG_UPDATE_DONE'))
      getDataPaging()
    })
  }
}
</script>
<template>
  <CCard>
    <CCardHeader>
      <CRow>
        <CCol :sm="5">
          <CInputGroup>
            <CFormInput
              v-model="searchValue"
              :placeholder="t('SEARCH')"
              aria-label="Search field"
              aria-describedby="btnSearch"
              @keyup.enter="doSearch"
            />
            <CButton
              @click="doSearch"
              type="button"
              color="secondary"
              variant="outline"
              id="btnSearch"
              >{{ t('SEARCH_BTN') }}</CButton
            >
          </CInputGroup>
        </CCol>
        <CCol :sm="7" class="d-none d-md-block">
          <CButton color="primary" variant="outline" @click="onOpenModal()" class="float-end">
            <CIcon icon="cilPlus" />{{ t('ADD') }}
          </CButton>
        </CCol>
      </CRow>
    </CCardHeader>
    <CCardBody>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">{{ t('PROGRAM_NAME') }}</CTableHeaderCell>
            <CTableHeaderCell scope="col">{{ t('STUDY_LEVEL') }}</CTableHeaderCell>
            <CTableHeaderCell scope="col">{{ t('FACULTY_NAME') }}</CTableHeaderCell>
            <CTableHeaderCell scope="col">{{ t('INDUSTRY_NAME') }}</CTableHeaderCell>
            <CTableHeaderCell scope="col" class="text-center">{{ t('STATUS') }}</CTableHeaderCell>
            <CTableHeaderCell scope="col" class="text-center">{{ t('ACTIONS') }}</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow v-for="(program, index) in listProgram.data" :key="index">
            <CTableHeaderCell scope="row">{{ program.id }}</CTableHeaderCell>
            <CTableDataCell>{{ locale === 'EN' ? program.nameEn : program.nameLv }}</CTableDataCell>
            <CTableDataCell>{{ program.studyLevel }}</CTableDataCell>
            <CTableDataCell>{{
              locale === 'EN' ? program.faculty.nameEn : program.faculty.nameLv
            }}</CTableDataCell>
            <CTableDataCell>
              <CBadge
                v-for="industry in program.industryList"
                :key="industry.id"
                class="me-1"
                color="info"
                >{{ locale === 'EN' ? industry.nameEn : industry.nameLv }}</CBadge
              >
            </CTableDataCell>
            <CTableDataCell class="text-center">
              <CBadge
                v-if="program.status"
                color="success"
                class="pe-on"
                @click="onChangeStatus(program.id!)"
                >{{ t('ACTIVE') }}</CBadge
              >
              <CBadge v-else color="danger" class="pe-on" @click="onChangeStatus(program.id!)">{{
                t('INACTIVE')
              }}</CBadge>
            </CTableDataCell>
            <CTableDataCell class="text-center">
              <CButton @click="onOpenModal(program)" color="success" size="sm" shape="rounded-pill"
                ><CIcon icon="cilPencil"></CIcon
              ></CButton>
              <div className="vr h-100 mx-2 text-body"></div>
              <CButton @click="onDelete(program.id!)" color="danger" size="sm" shape="rounded-pill"
                ><CIcon icon="cilTrash"></CIcon
              ></CButton>
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </CCardBody>
    <CCardFooter>
      <AppPaginate :pageConfig="listProgram" @pageChange="pageChange($event)" />
    </CCardFooter>
  </CCard>

  <CModal :visible="showModal" @close="onCloseModal">
    <CModalBody>
      <ProgramForm :modalData="modalData" @closeModal="onCloseModal"></ProgramForm>
    </CModalBody>
  </CModal>
</template>
