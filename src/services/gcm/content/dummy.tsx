import { APIBaseResponse } from '@interfaces/api'
import { IListContent } from '@interfaces/gcmContent'

export function dummyGetListContent(): Promise<APIBaseResponse<IListContent[]>> {
  const response = {
    reqId: '126d9879-889e-4239-91d3-fd470b7b1ce1',
    status: 'T',
    message: 'Berhasil',
    error: null,
    data: [
      {
        idFile: 1,
        fileName: 'AAA.JPG',
        subKategoriMenu: 'AGC',
        pathFile: 'https://google.com',
      },
      {
        idFile: 2,
        fileName: 'AAAB.JPG',
        subKategoriMenu: 'AGC',
        pathFile: 'https://google.com',
      },
      {
        idFile: 3,
        fileName: 'AAAC.JPG',
        subKategoriMenu: 'AGC',
        pathFile: 'https://google.com',
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

export function dummyCreateContent(): Promise<APIBaseResponse<any>> {
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
      // reject(new Error('failed fetch detail'))
      resolve(response)
    }, 1000)
  })
}

export function dummyDeleteContent(): Promise<APIBaseResponse<any>> {
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
      // reject(new Error('failed create'))
      resolve(response)
    }, 1000)
  })
}
