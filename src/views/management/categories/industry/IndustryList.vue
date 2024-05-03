<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'

// @ts-ignore
import IndustryService from '@/core/services/management/industry.service'

import IndustryForm from './IndustryForm.vue'
// @ts-ignore
import AppPaginate from '@/components/AppPaginate.vue'
import { Paginate } from '@/core/models/paginate.model'

import { Industry } from '@/core/models/categories/industry.model'
import { ModalData } from '@/core/models/common/modal-data.model'
import { SystemConstant } from '@/core/constants/system.constant'
import type { PagedResults } from '@/core/models/common/response-page.model'
import type { AxiosResponse } from 'axios'

const { t } = useI18n()
const listIndustry = ref(new Paginate<Industry>())
const searchValue = ref('')
const showModal = ref(false)
const modalData: ModalData<Industry> = new ModalData<Industry>()

onBeforeMount(() => {
  getDataPaging()
})

const getDataPaging = (isSearch?: string) => {
  if (isSearch) listIndustry.value.currentPage = 1
  IndustryService.getAllPaging(
    listIndustry.value.currentPage - 1,
    listIndustry.value.limit,
    searchValue.value
  ).then((res: AxiosResponse<PagedResults<Industry>>) => {
    const response = res.data
    listIndustry.value.currentPage = response.pageable.pageNumber + 1
    listIndustry.value.limit = response.pageable.pageSize
    listIndustry.value.totalPage = response.totalPages
    listIndustry.value.totalItem = response.totalElements
    listIndustry.value.data = response.content
  })
}

const doSearch = () => {
  getDataPaging(searchValue.value)
}

const pageChange = (page: Paginate<Industry>) => {
  listIndustry.value = page
  getDataPaging()
}

const onOpenModal = (data?: Industry) => {
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
    // listIndustry.value.currentPage = 1
    getDataPaging()
  }
  showModal.value = false
}

const onChangeStatus = (id: number) => {
  if (confirm(t('CONFIRM_CHANGE_STATUS'))) {
    IndustryService.changeStatus(id).then(() => {
      toast.success(t('MSG_CHANGE_DONE'))
      getDataPaging()
    })
  }
}

const onDelete = (id: number) => {
  if (confirm(t('CONFIRM_DELETE'))) {
    IndustryService.delete(id).then(() => {
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
            <CTableHeaderCell scope="col">{{ t('INDUSTRY_NAME_EN') }}</CTableHeaderCell>
            <CTableHeaderCell scope="col">{{ t('INDUSTRY_NAME_LV') }}</CTableHeaderCell>
            <CTableHeaderCell scope="col" class="text-center">{{ t('STATUS') }}</CTableHeaderCell>
            <CTableHeaderCell scope="col" class="text-center">{{ t('ACTIONS') }}</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow v-for="(industry, index) in listIndustry.data" :key="index">
            <CTableHeaderCell scope="row">{{ industry.id }}</CTableHeaderCell>
            <CTableDataCell>{{ industry.nameEn }}</CTableDataCell>
            <CTableDataCell>{{ industry.nameLv }}</CTableDataCell>
            <CTableDataCell class="text-center">
              <CBadge
                v-if="industry.status"
                color="success"
                class="pe-on"
                @click="onChangeStatus(industry.id!)"
                >{{ t('ACTIVE') }}</CBadge
              >
              <CBadge v-else color="danger" class="pe-on" @click="onChangeStatus(industry.id!)">{{
                t('INACTIVE')
              }}</CBadge>
            </CTableDataCell>
            <CTableDataCell class="text-center">
              <CButton @click="onOpenModal(industry)" color="success" size="sm" shape="rounded-pill"
                ><CIcon icon="cilPencil"></CIcon
              ></CButton>
              <div className="vr h-100 mx-2 text-body"></div>
              <CButton @click="onDelete(industry.id!)" color="danger" size="sm" shape="rounded-pill"
                ><CIcon icon="cilTrash"></CIcon
              ></CButton>
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </CCardBody>
    <CCardFooter>
      <AppPaginate :pageConfig="listIndustry" @pageChange="pageChange($event)" />
    </CCardFooter>
  </CCard>

  <CModal :visible="showModal" @close="onCloseModal">
    <CModalBody>
      <IndustryForm :modalData="modalData" @closeModal="onCloseModal"></IndustryForm>
    </CModalBody>
  </CModal>
</template>
