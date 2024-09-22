import { APIBaseResponse } from '@interfaces/api'
import { IMonitoringManpowerDetail, IMonitoringManpowerList } from '@interfaces/monitoringManpower'

export function dummyGetListManpower(): Promise<APIBaseResponse<IMonitoringManpowerList[]>> {
  const dataFunc = (idBooking: number) => {
    const data: IMonitoringManpowerList = {
      idBooking,
      nama: 'ZUUU',
      lokasi: 'ACC',
      kategori: 'Cleaning Service',
      requestManpower: '6 Orang',
      tanggalPengajuan: '05 Aug 2024 - 11:19',
      tanggalBooking: '10 Jul 2024 - 10 Jul 2024',
      waktuBooking: '13:00 - 14:00',
    }

    return data
  }
  const response = {
    reqId: '126d9879-889e-4239-91d3-fd470b7b1ce1',
    status: 'T',
    message: 'Berhasil',
    error: null,
    data: [
      dataFunc(3081),
      dataFunc(3082),
      dataFunc(3083),
      dataFunc(3084),
      dataFunc(3085),
      dataFunc(3086),
      dataFunc(3087),
      dataFunc(3088),
      dataFunc(3089),
      dataFunc(3090),
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

export function dummyGetDetailManpower(): Promise<APIBaseResponse<IMonitoringManpowerDetail>> {
  const dataFunc = () => {
    const data: IMonitoringManpowerDetail = {
      tanggalPengajuan: '23 Aug 2024 - 17:02',
      kategoriManpower: 'Cleaning Service',
      nama: 'Dummy Person',
      gender: 'Laki - laki',
      lokasi: 'ACC',
      tanggalBooking: '24 Aug 2024 - 24 Aug 2024',
      jamBooking: '12:30 - 13:00',
      keperluan: 'lorem ipsum dolor sit amet',
      kebutuhanManpower: '6 Orang',
      status: 'REQUEST',
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
