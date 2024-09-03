import { APIBaseResponse } from '@interfaces/api'
import { IGcmCarType } from '@interfaces/gcmCarType'

export function dummyGetCarType(): Promise<APIBaseResponse<IGcmCarType[]>> {
  const response = {
    reqId: '126d9879-889e-4239-91d3-fd470b7b1ce1',
    status: 'T',
    message: 'Berhasil',
    error: null,
    data: [
      {
        noSr: '4',
        descGcm: 'Tipe 1',
        brand: 'TOYOTA',
        dtUpload: '2024-08-07 00:41:14',
        flagActive: true,
      },
      {
        noSr: '5',
        descGcm: 'Tipe 1',
        brand: 'HONDA',
        dtUpload: '2024-08-07 00:44:29',
        flagActive: true,
      },
      {
        noSr: '1',
        descGcm: 'Tipe 1',
        brand: 'MADZA',
        dtUpload: '2024-08-07 00:46:40',
        flagActive: true,
      },
      {
        noSr: '2',
        descGcm: 'Tipe 1',
        brand: 'HYUNDAI',
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

export function dummyGetCarTypeDetail(): Promise<APIBaseResponse<IGcmCarType>> {
  const response = {
    reqId: '413693f6-4903-48c6-8733-25150e748464',
    status: 'T',
    message: 'Berhasil',
    error: null,
    data: {
      noSr: '2',
      descGcm: 'Tipe 1',
      brand: 'HYUNDAI',
      dtUpload: '2024-08-07 00:46:40',
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

export function dummyCreateCarType(): Promise<APIBaseResponse<IGcmCarType>> {
  const response = {
    reqId: '413693f6-4903-48c6-8733-25150e748464',
    status: 'T',
    message: 'Berhasil',
    error: null,
    data: {
      noSr: '2',
      descGcm: 'Tipe 1',
      brand: 'HYUNDAI',
      dtUpload: '2024-08-07 00:46:40',
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

export function dummyUpdateCarType(): Promise<APIBaseResponse<IGcmCarType>> {
  const response = {
    reqId: '413693f6-4903-48c6-8733-25150e748464',
    status: 'T',
    message: 'Berhasil',
    error: null,
    data: {
      noSr: '2',
      descGcm: 'Tipe 1',
      brand: 'HYUNDAI',
      dtUpload: '2024-08-07 00:46:40',
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

export function dummyToggleStatusCarType(): Promise<APIBaseResponse<IGcmCarType>> {
  const response = {
    reqId: '413693f6-4903-48c6-8733-25150e748464',
    status: 'T',
    message: 'Berhasil',
    error: null,
    data: {
      noSr: '2',
      descGcm: 'Tipe 1',
      brand: 'HYUNDAI',
      dtUpload: '2024-08-07 00:46:40',
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

export function dummyDeleteCarType(): Promise<APIBaseResponse<any>> {
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
