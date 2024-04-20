<script setup lang="ts">
import {
  CTable,
  CRow,
  CCol,
  CFormInput,
  CInputGroup,
  CButton,
  CModal,
  CModalTitle,
  CModalHeader,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CModalBody,
  CBadge
} from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { onBeforeMount, ref } from 'vue'
import FacultyService from '@/core/services/management/faculty.service'
import { Paginate } from '@/core/models/paginate.model'
import PaginateView from '@/components/PaginateView.vue'
import FacultyForm from './FacultyForm.vue'
import { Faculty } from '@/core/models/categories/faculty.model'
import { ModalData } from '@/core/models/common/modal-data.model'
import { SystemConstant } from '@/core/constants/system.constant'

let modalData: ModalData<Faculty> = new ModalData<Faculty>()

let listFaculty = ref(new Paginate<Faculty>())
let searchValue = ''
onBeforeMount(() => {
  getDataPaging()
})
let showModal = ref(false)

function getDataPaging(isSearch?: boolean) {
  if (isSearch) listFaculty.value.currentPage = 1
  FacultyService.getAllPaging(
    listFaculty.value.currentPage - 1,
    listFaculty.value.limit,
    searchValue
  ).then((res) => {
    let response = res.data
    listFaculty.value.currentPage = response.pageable.pageNumber + 1
    listFaculty.value.limit = response.pageable.pageSize
    listFaculty.value.totalPage = response.totalPages
    listFaculty.value.totalItem = response.totalElements
    listFaculty.value.data = response.content
  })
}

function pageChange(page: Paginate<Faculty>) {
  listFaculty.value = page
  getDataPaging()
}

function onOpenModal(data?: Faculty) {
  if (data) {
    modalData.title = `Edit Faculty ${data.id}`
    modalData.action = SystemConstant.ACTION.EDIT
    modalData.data = data
  } else {
    modalData.title = `Create Faculty`
    modalData.action = SystemConstant.ACTION.ADD
  }
  showModal.value = true
}

function onCloseModal(isRefresh?: boolean) {
  if (isRefresh) {
    listFaculty.value.currentPage = 1
    getDataPaging()
  }
  showModal.value = false
}

function onChangeStatus(id: number) {
  let action = confirm(`change status ${id}?`)
  if (action) {
    FacultyService.changeStatus(id).then(
      () => {
        getDataPaging()
      },
      (error) => {
        alert('something wrong: ' + error.response.data.message)
      }
    )
  }
}

function onDelete(id: number) {
  let action = confirm(`delete ${id}?`)
  if (action) {
    FacultyService.delete(id).then(
      () => {
        getDataPaging()
      },
      (error) => {
        alert('something wrong: ' + error.response.data.message)
      }
    )
  }
}

const columns = [
  {
    key: 'id',
    label: '#',
    _props: { scope: 'col' }
  },
  {
    key: 'nameEn',
    label: 'English Name',
    _props: { scope: 'col' }
  },
  {
    key: 'nameLv',
    label: 'Latvian Name',
    _props: { scope: 'col' }
  },
  {
    key: 'status',
    _props: { scope: 'col' }
  },
  {
    key: 'actions',
    _props: { scope: 'col' }
  }
]
</script>
<template>
  <CRow>
    <CCol>
      <span>Faculty</span>
    </CCol>
    <CCol class="text-right">
      <CInputGroup class="mb-3">
        <CFormInput
          placeholder="Search..."
          aria-label="Search field"
          aria-describedby="btnSearch"
        />
        <CButton type="button" color="secondary" variant="outline" id="btnSearch">Search</CButton>
      </CInputGroup>
      <CButton color="primary" variant="outline" @click="onOpenModal()">Add</CButton>
    </CCol>
  </CRow>
  <hr />
  <CTable color="dark" :columns="columns">
    <CTableBody>
      <CTableRow v-for="(faculty, index) in listFaculty.data" :key="index">
        <CTableHeaderCell scope="row">{{ faculty.id }}</CTableHeaderCell>
        <CTableDataCell>{{ faculty.nameEn }}</CTableDataCell>
        <CTableDataCell>{{ faculty.nameLv }}</CTableDataCell>
        <CTableDataCell>
          <CBadge
            v-if="faculty.status"
            color="success"
            class="status"
            @click="onChangeStatus(faculty.id!)"
            >Active</CBadge
          >
          <CBadge v-else color="danger" class="status" @click="onChangeStatus(faculty.id!)"
            >InActive</CBadge
          >
        </CTableDataCell>
        <CTableDataCell>
          <CButton @click="onOpenModal(faculty)" color="success" size="sm" shape="rounded-pill"
            ><CIcon icon="cilPencil"></CIcon
          ></CButton>
          <CButton @click="onDelete(faculty.id!)" color="danger" size="sm" shape="rounded-pill"
            ><CIcon icon="cilTrash"></CIcon
          ></CButton>
        </CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>
  <PaginateView :pageConfig="listFaculty" @pageChange="pageChange($event)"></PaginateView>
  <CModal :visible="showModal" @close="onCloseModal">
    <CModalBody>
      <FacultyForm :modalData="modalData" @closeModal="onCloseModal"></FacultyForm>
    </CModalBody>
  </CModal>
</template>
<style scoped>
.status {
  cursor: pointer;
}
</style>
