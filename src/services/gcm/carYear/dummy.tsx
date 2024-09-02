import { APIBaseResponse } from '@interfaces/api'
import { IGcmCarYear } from '@interfaces/gcmCarYear'

export function dummyGetCarYear(): Promise<APIBaseResponse<IGcmCarYear[]>> {
  const response = {
    reqId: '126d9879-889e-4239-91d3-fd470b7b1ce1',
    status: 'T',
    message: 'Berhasil',
    error: null,
    data: [
      {
        noSr: '4',
        descGcm: '2007',
        dtUpload: '2024-08-07 00:41:14',
        flagActive: true,
      },
      {
        noSr: '5',
        descGcm: '2008',
        dtUpload: '2024-08-07 00:44:29',
        flagActive: true,
      },
      {
        noSr: '1',
        descGcm: '2009',
        dtUpload: '2024-08-07 00:46:40',
        flagActive: true,
      },
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

export function dummyGetCarYearDetail(): Promise<APIBaseResponse<IGcmCarYear>> {
  const response = {
    reqId: '413693f6-4903-48c6-8733-25150e748464',
    status: 'T',
    message: 'Berhasil',
    error: null,
    data: {
      noSr: '4',
      descGcm: '2009',
      dtUpload: '2024-08-07 00:41:14',
      flagActive: true,
    },
  }

  // return new Promise(function (resolve, reject) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      // reject(new Error('failed fetch detail'))
      resolve(response)
    }, 1000)
  })
}

export function dummyCreateCarYear(): Promise<APIBaseResponse<IGcmCarYear>> {
  const response = {
    reqId: '413693f6-4903-48c6-8733-25150e748464',
    status: 'T',
    message: 'Berhasil',
    error: null,
    data: {
      noSr: '4',
      descGcm: 'Testing CarYear',
      dtUpload: '2024-08-07 00:41:14',
      flagActive: true,
    },
  }

  // return new Promise(function (resolve, reject) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      // reject(new Error('failed create'))
      resolve(response)
    }, 1000)
  })
}

export function dummyUpdateCarYear(): Promise<APIBaseResponse<IGcmCarYear>> {
  const response = {
    reqId: '413693f6-4903-48c6-8733-25150e748464',
    status: 'T',
    message: 'Berhasil',
    error: null,
    data: {
      noSr: '4',
      descGcm: 'Testing CarYear',
      dtUpload: '2024-08-07 00:41:14',
      flagActive: true,
    },
  }

  // return new Promise(function (resolve, reject) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      // reject(new Error('failed update'))
      resolve(response)
    }, 1000)
  })
}

export function dummyToggleStatusCarYear(): Promise<APIBaseResponse<IGcmCarYear>> {
  const response = {
    reqId: '413693f6-4903-48c6-8733-25150e748464',
    status: 'T',
    message: 'Berhasil',
    error: null,
    data: {
      noSr: '4',
      descGcm: 'Testing CarYear',
      dtUpload: '2024-08-07 00:41:14',
      flagActive: true,
    },
  }

  // return new Promise(function (resolve, reject) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      // reject(new Error('failed update toogle'))
      resolve(response)
    }, 1000)
  })
}

export function dummyDeleteCarYear(): Promise<APIBaseResponse<{}>> {
  const response = {
    reqId: '413693f6-4903-48c6-8733-25150e748464',
    status: 'T',
    message: 'Berhasil',
    error: null,
    data: {},
  }

  // return new Promise(function (resolve, reject) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      // reject(new Error('failed delete'))
      resolve(response)
    }, 1000)
  })
}
