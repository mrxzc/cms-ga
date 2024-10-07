import { APIBaseResponse } from '@interfaces/api'
import { IDeleteContentParams, IListContent, IListContentParams } from '@interfaces/gcmContent'
import { API_MASTER } from '@utils/environment'
import httpRequest from '@utils/helper'
// import { dummyCreateContent, dummyDeleteContent, dummyGetListContent } from './dummy'

const api = httpRequest(API_MASTER)

export function apiGetListContent(params: IListContentParams): Promise<APIBaseResponse<IListContent[]>> {
  //  // return dummyGetListContent()

  return api.get<IListContent[], APIBaseResponse<IListContent[]>>('/cms/master/konten/list', {
    params,
  })
}

export function apiCreateContent(formData: FormData): Promise<APIBaseResponse<any>> {
  //  // return dummyCreateContent()

  const headers = {
    'Content-Type': 'multipart/form-data',
  }
  return api.post<any, APIBaseResponse<any>>('/cms/master/konten/create', formData, { headers })
}

export function apiDeleteContent(params: IDeleteContentParams): Promise<APIBaseResponse<any>> {
  //  // return dummyDeleteContent()

  return api.post<any, APIBaseResponse<any>>('/cms/master/konten/delete', params)
}
