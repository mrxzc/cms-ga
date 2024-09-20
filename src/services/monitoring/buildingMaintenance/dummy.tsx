import { APIBaseResponse } from '@interfaces/api'
import {
  IMonitoringBuildingMaintenanceDetail,
  IMonitoringBuildingMaintenanceList,
} from '@interfaces/monitoringBuildingMaintenance'

export function dummyGetListBuildingMaintenance(): Promise<APIBaseResponse<IMonitoringBuildingMaintenanceList[]>> {
  const dataFunc = (noId: number) => {
    const data: IMonitoringBuildingMaintenanceList = {
      noId,
      requestor: 'Dummy Person',
      location: 'ACC',
      area: 'ACC TB Simatupang',
      costEstimasi: 2000000,
      requestDesc: 'Perbaikan pagar',
      dtAdded: '2024-07-01 05:02:55',
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

export function dummyGetDetailBuildingMaintenance(): Promise<APIBaseResponse<IMonitoringBuildingMaintenanceDetail>> {
  const dataFunc = () => {
    const data: IMonitoringBuildingMaintenanceDetail = {
      noId: 1,
      dateRequest: '2024-07-01 12:00:00',
      requestor: 'Dummy Person',
      location: 'ACC',
      area: 'ACC TB Simatupang',
      costEstimasi: 20000000,
      requestDesc: 'Perbaikan pagar',
      submissionPathFile: 'file/file.jpg',
      dtAdded: '2024-07-01 05:02:55',
    }

    return data
  }
  const response = {
    reqId: '126d9879-889e-4239-91d3-fd470b7b1ce1',
    status: 'T',
    message: 'Berhasil',
    error: null,
    data: dataFunc(),
  }

  // return new Promise(function (resolve, reject) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      // reject(new Error('failed fetch'))
      resolve(response)
    }, 1000)
  })
}
