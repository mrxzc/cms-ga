import { APIBaseResponse } from '@interfaces/api'
import {
  IMonitoringBranchConditionReportDetail,
  IMonitoringBranchConditionReportList,
} from '@interfaces/monitoringBranchConditionReport'

export function dummyGetListBranchConditionReport(): Promise<APIBaseResponse<IMonitoringBranchConditionReportList[]>> {
  const dataFunc = (noId: number) => {
    const data: IMonitoringBranchConditionReportList = {
      noId,
      requestor: 'Dummy Person',
      location: 'ACC',
      area: 'ACC TB Simatupang',
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

export function dummyGetDetailBranchConditionReport(): Promise<
  APIBaseResponse<IMonitoringBranchConditionReportDetail>
> {
  const dataFunc = () => {
    const data: IMonitoringBranchConditionReportDetail = {
      noId: 1,
      requestor: 'Dummy Person',
      location: 'ACC',
      area: 'ACC TB Simatupang',
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
