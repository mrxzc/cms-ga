import { APIBaseResponse } from '@interfaces/api'

export function dummyGetListBast(): Promise<APIBaseResponse<any>> {
  const response = {
    reqId: '126d9879-889e-4239-91d3-fd470b7b1ce1',
    status: 'T',
    message: 'Berhasil',
    error: null,
    data: [
      {
        id: 1,
        code: 'FFFFFF00000000',
        name: 'BIKO MARYONO',
        location: 'ACC',
        vehicleType: 'Operational Khusus',
        detailUnit: 'Toyota Innova Reborn 2022',
        brand: 'TOYOTA',
        type: 'INOVA REBORN',
        year: '2022',
        bookingDate: '17 Dec 2024 - 20 Dec 2024',
        dtUpload: '17 Dec 2024 - 14:00',
      },
      {
        id: 2,
        code: 'FFFFFF00000000',
        name: 'BIKO MARYONO',
        location: 'ACC',
        vehicleType: 'Operational Khusus',
        detailUnit: 'Toyota Innova Reborn 2022',
        brand: 'TOYOTA',
        type: 'INOVA REBORN',
        year: '2022',
        bookingDate: '17 Dec 2024 - 20 Dec 2024',
        dtUpload: '17 Dec 2024 - 14:00',
      },
      {
        id: 3,
        code: 'FFFFFF00000000',
        name: 'BIKO MARYONO',
        location: 'ACC',
        vehicleType: 'Operational Khusus',
        detailUnit: 'Toyota Innova Reborn 2022',
        brand: 'TOYOTA',
        type: 'INOVA REBORN',
        year: '2022',
        bookingDate: '17 Dec 2024 - 20 Dec 2024',
        dtUpload: '17 Dec 2024 - 14:00',
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

export function dummyGetDetailBastIn(): Promise<APIBaseResponse<any>> {
  const response = {
    reqId: '126d9879-889e-4239-91d3-fd470b7b1ce1',
    status: 'T',
    message: 'Berhasil',
    error: null,
    data: {
      id: 1,
      kmBack: '2 Juli 2024 - 12:00',
      outTime: 'ACC',
      condition: 'lorem ipsum dolor sit amet',
      fuelCondition: '',
      refuel: '',
      photos: ['', '', '', ''],
      description: 'request untuk acara',
      withDriver: 'Ya',
      bookingDate: '24 Dec - 26 Dec 2024',
      bookingTime: '18:00 - 21:00',
      location: 'ACC',
      detailUnit: 'Toyota Innova Reborn 2022',
      capacity: '6 Orang',
      transmision: 'Manual',
      plateNumber: 'B1234ZXC - GANJIL',
      fuel: 'Bensin',
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

export function dummyGetDetailBastOut(): Promise<APIBaseResponse<any>> {
  const response = {
    reqId: '126d9879-889e-4239-91d3-fd470b7b1ce1',
    status: 'T',
    message: 'Berhasil',
    error: null,
    data: {
      id: 1,
      kmBack: '2 Juli 2024 - 12:00',
      security: 'BIKO MARYONO',
      outTime: 'ACC',
      condition: 'lorem ipsum dolor sit amet',
      fuelCondition: '',
      refuel: '',
      photos: ['', '', '', ''],
      description: 'request untuk acara',
      withDriver: 'Ya',
      bookingDate: '24 Dec - 26 Dec 2024',
      bookingTime: '18:00 - 21:00',
      location: 'ACC',
      detailUnit: 'Toyota Innova Reborn 2022',
      capacity: '6 Orang',
      transmision: 'Manual',
      plateNumber: 'B1234ZXC - GANJIL',
      fuel: 'Bensin',
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
