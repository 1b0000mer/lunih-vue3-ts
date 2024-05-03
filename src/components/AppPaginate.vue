<script setup lang="ts">
const props = defineProps(['pageConfig'])
const emit = defineEmits(['pageChange'])

let _pageConfig = props.pageConfig

const setPage = (pageNumber: number) => {
  if (
    pageNumber > 0 &&
    pageNumber <= props.pageConfig.totalPage! &&
    pageNumber !== props.pageConfig.currentPage
  ) {
    _pageConfig.currentPage = pageNumber
    refreshPage()
  }
}

const changedNumOfItem = (numOfItem: string) => {
  _pageConfig.limit = Number.parseInt(numOfItem, 10)
  _pageConfig.currentPage = 1
  refreshPage()
}

const refreshPage = () => {
  emit('pageChange', _pageConfig)
}
</script>
<template>
  <CForm class="row g-3">
    <CCol xs="auto">
      <CPagination align="center" aria-label="Page navigation example">
        <CPaginationItem @click="setPage(1)" :disabled="pageConfig.currentPage === 1"
          ><CIcon icon="cilChevronDoubleLeft"
        /></CPaginationItem>
        <CPaginationItem
          @click="setPage(pageConfig.currentPage - 1)"
          :disabled="pageConfig.currentPage === 1"
          ><CIcon icon="cilChevronLeft"
        /></CPaginationItem>
        <CPaginationItem
          v-for="index in pageConfig.totalPage"
          :key="index"
          @click="setPage(index)"
          :active="index === pageConfig.currentPage"
        >
          {{ index }}
        </CPaginationItem>
        <CPaginationItem
          @click="setPage(pageConfig.currentPage + 1)"
          :disabled="pageConfig.currentPage === pageConfig.totalPage"
          ><CIcon icon="cilChevronRight"
        /></CPaginationItem>
        <CPaginationItem
          @click="setPage(pageConfig.totalPage)"
          :disabled="pageConfig.currentPage === pageConfig.totalPage"
          ><CIcon icon="cilChevronDoubleRight"
        /></CPaginationItem>
      </CPagination>
    </CCol>
    <CCol xs="auto">
      <CFormSelect
        :model-value="pageConfig.limit.toString()"
        @change="changedNumOfItem($event.target.value)"
        aria-label="paginate number list"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </CFormSelect>
    </CCol>
  </CForm>
</template>

<style scoped>
.input-paging-number {
  width: 50px;
  height: 28px;
  vertical-align: middle;
  text-align: center;
  border-color: rgba(0, 0, 0, 0.07) !important;
}

.text-right {
  text-align: right;
}
</style>
