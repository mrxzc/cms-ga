import { APIBaseResponse } from '@interfaces/api'
import { IMonitoringMeetingRoomDetail, IMonitoringMeetingRoomList } from '@interfaces/monitoringMeetingRoom'

export function dummyGetListMeetingRoom(): Promise<APIBaseResponse<IMonitoringMeetingRoomList[]>> {
  const dataFunc = (idBooking: number, idRoom: number) => {
    const data: IMonitoringMeetingRoomList = {
      idBooking,
      idRoom,
      nama: 'Dummy Person',
      lokasi: 'ACC',
      kapasitas: '10 Orang',
      lantaiRuangan: 'Lantai 10',
      titleRoom: 'Test 123',
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

export function dummyGetDetailMeetingRoom(): Promise<APIBaseResponse<IMonitoringMeetingRoomDetail>> {
  const dataFunc = () => {
    const data: IMonitoringMeetingRoomDetail = {
      tanggalPengajuan: '23 Aug 2024 - 17:02',
      name: 'Dummy Person',
      lokasi: 'ACC',
      tanggalBooking: '24 Aug 2024 - 24 Aug 2024',
      jamBooking: '12:30 - 13:00',
      requestKapasitas: '10 Orang',
      keperluan: 'lorem ipsum dolor sit amet',
      status: 'REQUEST',
      lokasiRuangan: 'ACC',
      titleRoom: 'Ruangan A',
      lantaiRuangan: 'Lantai 10',
      kapasitas: '10 Orang',
      deskripsi: '<ol><li>asd</li></ol>',
      termsAndCondition: '<ol><li>asd</li></ol>',
      fasilitas: ['kursi', 'meja'],
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
