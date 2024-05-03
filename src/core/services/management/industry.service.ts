import axios from 'axios'
import { UrlConstant } from '@/core/constants/url.constant'
import type { Industry } from '@/core/models/categories/industry.model'
import type { PagedResults } from '@/core/models/common/response-page.model'

const apiURL = UrlConstant.API.INDUSTRY

const IndustryService = {
  getAll() {
    return axios.get(apiURL)
  },

  getAllPaging(page: number, size: number, search?: string, sort?: string, column?: string) {
    const params = {
      page: page,
      size: size,
      search: search ?? '',
      sort: sort ?? '',
      column: column ?? ''
    }

    return axios.get<PagedResults<Industry>>(apiURL + '/paging', { params })
  },

  create(model: Industry) {
    return axios.post(apiURL, model)
  },

  update(id: number, model: Industry) {
    return axios.put(apiURL + `/${id}`, model)
  },

  changeStatus(id: number) {
    return axios.delete(apiURL + '/change-status/' + id)
  },

  delete(id: number) {
    return axios.delete(apiURL + `/${id}`)
  }
}

export default IndustryService
