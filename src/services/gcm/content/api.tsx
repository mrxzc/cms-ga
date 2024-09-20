import { APIBaseResponse } from '@interfaces/api'
import { IDeleteContentParams, IListContent, IListContentParams } from '@interfaces/gcmContent'
import { API_MASTER } from '@utils/environment'
import httpRequest from '@utils/helper'
// import { dummyCreateContent, dummyDeleteContent, dummyGetListContent } from './dummy'

const api = httpRequest(API_MASTER)

export function apiGetListContent(
  params: IListContentParams,
  idUser: string
): Promise<APIBaseResponse<IListContent[]>> {
  //  // return dummyGetListContent()

  const headers = {
    idUser,
  }

  return api.get<IListContent[], APIBaseResponse<IListContent[]>>('/cms/master/konten/list', {
    params,
    headers,
  })
}

export function apiCreateContent(formData: FormData, idUser: string): Promise<APIBaseResponse<any>> {
  //  // return dummyCreateContent()

  const headers = {
    idUser,
    'Content-Type': 'multipart/form-data',
  }
  return api.post<any, APIBaseResponse<any>>('/cms/master/konten/create', formData, { headers })
}

export function apiDeleteContent(params: IDeleteContentParams, idUser: string): Promise<APIBaseResponse<any>> {
  //  // return dummyDeleteContent()

  const headers = {
    idUser,
  }
  return api.post<any, APIBaseResponse<any>>('/cms/master/konten/delete', params, { headers })
}
