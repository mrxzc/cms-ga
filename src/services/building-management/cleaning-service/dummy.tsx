import { APIBaseResponse } from '@interfaces/api'
import {
  IBuildingManagementCleaningServiceDetail,
  IBuildingManagementCleaningServiceList,
} from '@interfaces/building-management-cleaning-service'

export function dummyGetCleaningServiceList(): Promise<APIBaseResponse<IBuildingManagementCleaningServiceList[]>> {
  const dataFunc = (noId: number) => {
    const data: IBuildingManagementCleaningServiceList = {
      noId,
      requestor: '',
      location: 'ACC',
      area: '',
      descSp: 'Fatmawati',
      kategoriRequest: 'Refreshment',
      dateRequest: '2024-08-01 21:21:51',
    }

    return data
  }
  const response = {
    reqId: '126d9879-889e-4239-91d3-fd470b7b1ce1',
    status: 'T',
    message: 'Berhasil',
    error: null,
    data: [
      dataFunc(1),
      dataFunc(2),
      dataFunc(3),
      dataFunc(4),
      dataFunc(5),
      dataFunc(6),
      dataFunc(7),
      dataFunc(8),
      dataFunc(9),
      dataFunc(10),
    ],
    pagination: {
      totalRecords: 100,
      currentPage: 1,
      totalPage: 10,
      nextPage: null,
      prevPage: null,
    },
  }

  // return new Promise(function (resolve, reject) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      // reject(new Error('failed fetch'))
      resolve(response)
    }, 1000)
  })
}

export function dummyGetCleaningServiceDetail(): Promise<APIBaseResponse<IBuildingManagementCleaningServiceDetail>> {
  const dataFunc = (noId: number) => {
    const data: IBuildingManagementCleaningServiceDetail = {
      noId,
      dateRequest: '2024-08-01 21:21:51',
      requestor: '',
      location: 'ACC',
      area: '',
      descSp: 'Fatmawati',
      kategoriRequest: 'Refreshment',
      nameManpowerExisting: 'Jane Doe',
      lamaKerja: 2,
      reason: 'reason',
    }

    return data
  }
  const response = {
    reqId: '126d9879-889e-4239-91d3-fd470b7b1ce1',
    status: 'T',
    message: 'Berhasil',
    error: null,
    data: dataFunc(1),
  }

  // return new Promise(function (resolve, reject) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      // reject(new Error('failed fetch'))
      resolve(response)
    }, 1000)
  })
}
