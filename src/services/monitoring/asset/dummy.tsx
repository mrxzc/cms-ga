import { APIBaseResponse } from '@interfaces/api'
import { IMonitoringAssetDetail, IMonitoringAssetList } from '@interfaces/monitoringAsset'

export function dummyGetListAsset(): Promise<APIBaseResponse<IMonitoringAssetList[]>> {
  const dataFunc = (idBooking: number) => {
    const data: IMonitoringAssetList = {
      idBooking,
      nama: 'Dummy Person',
      totalAsset: '3 Items',
      tanggalBooking: '24 Aug 2024 - 24 Aug 2024',
      waktuBooking: '12:30 - 13:00',
      tanggalPengajuan: '23 Aug 2024 - 17:02',
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

export function dummyGetDetailAsset(): Promise<APIBaseResponse<IMonitoringAssetDetail>> {
  const dataFunc = () => {
    const data: IMonitoringAssetDetail = {
      tanggalPengajuan: '23 Aug 2024 - 17:02',
      name: 'Dummy Person',
      lokasi: 'ACC',
      tanggalBooking: '24 Aug 2024 - 24 Aug 2024',
      jamBooking: '12:30 - 13:00',
      keperluan: 'lorem ipsum dolor sit amet',
      status: '',
      produkTotal: '3 items',
      assets: null,
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
