<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'

import FacultyService from '@/core/services/management/faculty.service'

import FacultyForm from './FacultyForm.vue'
// @ts-ignore
import AppPaginate from '@/components/AppPaginate.vue'
import { Paginate } from '@/core/models/paginate.model'

import { Faculty } from '@/core/models/categories/faculty.model'
import { ModalData } from '@/core/models/common/modal-data.model'
import { SystemConstant } from '@/core/constants/system.constant'
import type { AxiosResponse } from 'axios'
import type { PagedResults } from '@/core/models/common/response-page.model'

const { t } = useI18n()
const listFaculty = ref(new Paginate<Faculty>())
const searchValue = ref('')
const showModal = ref(false)
const modalData: ModalData<Faculty> = new ModalData<Faculty>()

onBeforeMount(() => {
  getDataPaging()
})

const getDataPaging = (isSearch?: string) => {
  if (isSearch) listFaculty.value.currentPage = 1
  FacultyService.getAllPaging(
    listFaculty.value.currentPage - 1,
    listFaculty.value.limit,
    searchValue.value
  ).then((res: AxiosResponse<PagedResults<Faculty>>) => {
    const response = res.data
    listFaculty.value.currentPage = response.pageable.pageNumber + 1
    listFaculty.value.limit = response.pageable.pageSize
    listFaculty.value.totalPage = response.totalPages
    listFaculty.value.totalItem = response.totalElements
    listFaculty.value.data = response.content
  })
}

const doSearch = () => {
  getDataPaging(searchValue.value)
}

const pageChange = (page: Paginate<Faculty>) => {
  listFaculty.value = page
  getDataPaging()
}

const onOpenModal = (data?: Faculty) => {
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
    // listFaculty.value.currentPage = 1
    getDataPaging()
  }
  showModal.value = false
}

const onChangeStatus = (id: number) => {
  if (confirm(t('CONFIRM_CHANGE_STATUS'))) {
    FacultyService.changeStatus(id).then(() => {
      toast.success(t('MSG_CHANGE_DONE'))
      getDataPaging()
    })
  }
}

const onDelete = (id: number) => {
  if (confirm(t('CONFIRM_DELETE'))) {
    FacultyService.delete(id).then(() => {
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
            <CTableHeaderCell scope="col">{{ t('FACULTY_NAME_EN') }}</CTableHeaderCell>
            <CTableHeaderCell scope="col">{{ t('FACULTY_NAME_LV') }}</CTableHeaderCell>
            <CTableHeaderCell scope="col" class="text-center">{{ t('STATUS') }}</CTableHeaderCell>
            <CTableHeaderCell scope="col" class="text-center">{{ t('ACTIONS') }}</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow v-for="(faculty, index) in listFaculty.data" :key="index">
            <CTableHeaderCell scope="row">{{ faculty.id }}</CTableHeaderCell>
            <CTableDataCell>{{ faculty.nameEn }}</CTableDataCell>
            <CTableDataCell>{{ faculty.nameLv }}</CTableDataCell>
            <CTableDataCell class="text-center">
              <CBadge
                v-if="faculty.status"
                color="success"
                class="pe-on"
                @click="onChangeStatus(faculty.id!)"
                >{{ t('ACTIVE') }}</CBadge
              >
              <CBadge v-else color="danger" class="pe-on" @click="onChangeStatus(faculty.id!)">{{
                t('INACTIVE')
              }}</CBadge>
            </CTableDataCell>
            <CTableDataCell class="text-center">
              <CButton @click="onOpenModal(faculty)" color="success" size="sm" shape="rounded-pill"
                ><CIcon icon="cilPencil"></CIcon
              ></CButton>
              <div className="vr h-100 mx-2 text-body"></div>
              <CButton @click="onDelete(faculty.id!)" color="danger" size="sm" shape="rounded-pill"
                ><CIcon icon="cilTrash"></CIcon
              ></CButton>
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </CCardBody>
    <CCardFooter>
      <AppPaginate :pageConfig="listFaculty" @pageChange="pageChange($event)" />
    </CCardFooter>
  </CCard>

  <CModal :visible="showModal" @close="onCloseModal">
    <CModalBody>
      <FacultyForm :modalData="modalData" @closeModal="onCloseModal"></FacultyForm>
    </CModalBody>
  </CModal>
</template>
