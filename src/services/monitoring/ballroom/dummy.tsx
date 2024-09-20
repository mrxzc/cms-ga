import { APIBaseResponse } from '@interfaces/api'
import { IMonitoringBallroomDetail, IMonitoringBallroomList } from '@interfaces/monitoringBallroom'

export function dummyGetListBallroom(): Promise<APIBaseResponse<IMonitoringBallroomList[]>> {
  const dataFunc = (idBooking: number, idRoom: number) => {
    const data: IMonitoringBallroomList = {
      idBooking,
      idRoom,
      nama: 'Dummy Person',
      lokasi: 'ACC',
      lantaiRuangan: 'Lantai 10',
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
      dataFunc(3081, 352),
      dataFunc(3082, 352),
      dataFunc(3083, 352),
      dataFunc(3084, 352),
      dataFunc(3085, 352),
      dataFunc(3086, 352),
      dataFunc(3087, 352),
      dataFunc(3088, 352),
      dataFunc(3089, 352),
      dataFunc(3090, 352),
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

export function dummyGetDetailBallroom(): Promise<APIBaseResponse<IMonitoringBallroomDetail>> {
  const dataFunc = () => {
    const data: IMonitoringBallroomDetail = {
      tanggalPengajuan: '23 Aug 2024 - 17:02',
      name: 'Halo 1234',
      lokasi: 'ACC',
      tanggalBooking: '24 Aug 2024 - 24 Aug 2024',
      jamBooking: '12:30 - 13:00',
      fasilitas: ['kursi', 'proyektor', 'speaker', 'meja'],
      requestkapasitas: '0 Orang',
      keperluan: 'lorem ipsum dolor sit amet',
      deskripsiBooking: 'lorem ipsum',
      layout: '/document/trn-bucket-app/ballroom-seat-layout/3072_1.pdf',
      status: 'REQUEST',
      lokasiRuangan: 'ACC',
      titleRoom: 'Ballroom 2',
      lantaiRuangan: 'Lantai 8',
      deskripsi: '<ul><li>ballroom 123</li></ul>',
      termsAndCondition: '<ol><li>ballroom 123 456</li></ol>',
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
