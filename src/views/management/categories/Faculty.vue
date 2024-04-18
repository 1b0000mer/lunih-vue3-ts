<script setup lang="ts">
import { CTable } from '@coreui/vue'
import { onBeforeMount, ref } from 'vue'
import FacultyService from '@/core/services/management/faculty.service'
import { Paginate } from '@/core/models/paginate.model'
import PaginateView from '@/components/PaginateView.vue'
import type { Faculty } from '@/core/models/categories/faculty.model'

let listFaculty = ref(new Paginate<Faculty>())
let searchValue = ''
onBeforeMount(() => {
  getDataPaging()
})

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
  }
]
</script>
<template>
  <CTable color="dark" :columns="columns" :items="listFaculty.data"></CTable>
  <PaginateView :pageConfig="listFaculty" @pageChange="pageChange($event)"></PaginateView>
</template>
