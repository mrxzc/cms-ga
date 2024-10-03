import { APIBaseResponse } from '@interfaces/api'
import {
  IBuildingManagementWaterMeterDetail,
  IBuildingManagementWaterMeterList,
} from '@interfaces/building-management-water-meter'

export function dummyGetBuildingManagementWaterMeterList(): Promise<
  APIBaseResponse<IBuildingManagementWaterMeterList[]>
> {
  const dataFunc = (noId: number) => {
    const data: IBuildingManagementWaterMeterList = {
      noId,
      requestor: 'ZCUR120',
      location: 'ACC',
      area: 'DKI2',
      descSp: 'Fatmawati',
      waterMeterExisting: 0,
      waterMeterRequest: 2,
      dateRequest: '2024-09-25 11:47:02',
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

export function dummyGetBuildingManagementWaterMeterDetail(): Promise<
  APIBaseResponse<IBuildingManagementWaterMeterDetail>
> {
  const dataFunc = (noId: number) => {
    const data: IBuildingManagementWaterMeterDetail = {
      noId,
      dateRequest: '2024-09-25 11:47:02',
      requestor: 'ZCUR120',
      location: 'ACC',
      area: 'DKI2',
      descSp: 'Fatmawati',
      waterMeterExisting: 0,
      waterMeterRequest: 2,
      lastUpdateDate: '2024-09-25 11:47:02',
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
