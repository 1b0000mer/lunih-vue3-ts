<script setup lang="ts">
import { Paginate } from '@/core/models/paginate.model'
import { CButton, CFormSelect } from '@coreui/vue'
import { ref, reactive } from 'vue'

const props = defineProps(['pageConfig'])
const emit = defineEmits(['pageChange'])

let _pageConfig = props.pageConfig

function setPage(pageNumber: number) {
  if (
    pageNumber > 0 &&
    pageNumber <= props.pageConfig.totalPage! &&
    pageNumber !== props.pageConfig.currentPage
  ) {
    _pageConfig.currentPage = pageNumber
    refreshPage()
  }
}

function changedNumOfItem(numOfItem: string) {
  _pageConfig.limit = Number.parseInt(numOfItem, 10)
  _pageConfig.currentPage = 1
  refreshPage()
}

function refreshPage() {
  emit('pageChange', _pageConfig)
}
</script>
<template>
  <div class="row">
    <div class="col-sm-6">
      <CButton
        size="sm"
        color="primary"
        :disabled="pageConfig.currentPage === 1"
        @click="setPage(1)"
        ><<</CButton
      >
      <CButton
        size="sm"
        color="primary"
        @click="setPage(pageConfig.currentPage - 1)"
        :disabled="pageConfig.currentPage === 1"
        ><</CButton
      >
      <CButton
        size="sm"
        color="primary"
        @click="setPage(pageConfig.currentPage + 1)"
        :disabled="pageConfig.currentPage === pageConfig.totalPage"
        >></CButton
      >
      <CButton
        size="sm"
        color="primary"
        @click="setPage(pageConfig.totalPage)"
        :disabled="pageConfig.currentPage === pageConfig.totalPage"
        >>></CButton
      >
      <CFormSelect
        size="sm"
        class="input-paging-number"
        @change="changedNumOfItem($event.target.value)"
        aria-label="paginate number list"
      >
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </CFormSelect>
    </div>
    <div class="col-sm-6 text-right">
      <span>Page: 1/1</span>
      <span class="mr-left-5 mr-right-5">•</span>
      <span>Total: 10 items</span>
    </div>
  </div>
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
