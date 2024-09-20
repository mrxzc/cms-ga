import { APIBaseResponse } from '@interfaces/api'
import { IMonitoringPodsDetail, IMonitoringPodsList } from '@interfaces/monitoringPods'

export function dummyGetListPods(): Promise<APIBaseResponse<IMonitoringPodsList[]>> {
  const dataFunc = (idBooking: number) => {
    const data: IMonitoringPodsList = {
      idBooking,
      nama: 'Dummy Person',
      lokasi: 'ACC',
      titleRoom: '102',
      lantaiRuangan: 'Lantai 10',
      kapasitasRuangan: '2 Orang',
      tanggalPengajuan: '23 Aug 2024 - 17:02',
      tanggalBooking: '24 Aug 2024 - 24 Aug 2024',
      waktuBooking: '12:30 - 13:00',
      status: 'REQUEST',
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

export function dummyGetDetailPods(): Promise<APIBaseResponse<IMonitoringPodsDetail>> {
  const dataFunc = () => {
    const data: IMonitoringPodsDetail = {
      tanggalPengajuan: '23 Aug 2024 - 17:02',
      name: 'Dummy Person',
      lokasi: 'ACC',
      tanggalBooking: '24 Aug 2024 - 24 Aug 2024',
      jamBooking: '12:30 - 13:00',
      requestKapasitas: '1 Orang',
      keperluan: 'lorem ipsum dolor sit amet',
      status: 'REQUEST',
      lokasiRuangan: 'ACC',
      titleRoom: 'Helllo',
      lantaiRuangan: 'Lantai 1',
      kapasitas: '1 Orang',
      deskripsi: '<p>lorem ipsum dolor sit amet</p>',
      termsAndCondition: '<p>lorem ipsum dolor sit amet</p>',
      fasilitas: ['meja', 'proyektor', 'speaker'],
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
