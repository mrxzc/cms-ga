import { APIBaseResponse } from '@interfaces/api'
import { ICalendarEventDetail, ICalendarEventList } from '@interfaces/calendarEvent'

export function dummyGetCalendarEvent(): Promise<APIBaseResponse<ICalendarEventList[]>> {
  const response = {
    reqId: '126d9879-889e-4239-91d3-fd470b7b1ce1',
    status: 'T',
    message: 'Berhasil',
    error: null,
    data: [
      {
        noIdInfo: 2,
        title: 'upacara 17 agustus',
        dtUpload: '2024-08-22 19:45:51',
        flagShow: true,
        flagActive: true,
      },
      {
        noIdInfo: 3,
        title: 'promo beli 1 gratis 1',
        dtUpload: '2024-08-22 20:06:39',
        flagShow: true,
        flagActive: true,
      },
      {
        noIdInfo: 4,
        title: 'timnas day',
        dtUpload: '2024-08-22 20:07:00',
        flagShow: true,
        flagActive: true,
      },
      {
        noIdInfo: 5,
        title: 'training java',
        dtUpload: '2024-08-22 20:07:19',
        flagShow: true,
        flagActive: true,
      },
      {
        noIdInfo: 6,
        title: 'webinar data analyst',
        dtUpload: '2024-08-22 20:07:38',
        flagShow: true,
        flagActive: true,
      },
      {
        noIdInfo: 7,
        title: 'testing event 7',
        dtUpload: '2024-08-22 20:07:52',
        flagShow: false,
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

export function dummyGetCalendarEventDetail(): Promise<APIBaseResponse<ICalendarEventDetail>> {
  const response = {
    reqId: '413693f6-4903-48c6-8733-25150e748464',
    status: 'T',
    message: 'Berhasil',
    error: null,
    data: {
      noIdInfo: 3,
      title: 'promo beli 1 gratis 1',
      description: 'test description',
      dtUpload: '2024-08-22 20:06:39',
      flagActive: true,
      flagShow: true,
      image: 'test url image',
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

export function dummyCreateCalendarEvent(): Promise<APIBaseResponse<ICalendarEventDetail>> {
  const response = {
    reqId: '413693f6-4903-48c6-8733-25150e748464',
    status: 'T',
    message: 'Berhasil',
    error: null,
    data: {
      noIdInfo: 3,
      title: 'promo beli 1 gratis 1',
      description: 'test description',
      dtUpload: '2024-08-22 20:06:39',
      flagActive: true,
      flagShow: true,
      image: 'test url image',
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

export function dummyUpdateCalendarEvent(): Promise<APIBaseResponse<ICalendarEventDetail>> {
  const response = {
    reqId: '413693f6-4903-48c6-8733-25150e748464',
    status: 'T',
    message: 'Berhasil',
    error: null,
    data: {
      noIdInfo: 3,
      title: 'promo beli 1 gratis 1',
      description: 'test description',
      dtUpload: '2024-08-22 20:06:39',
      flagActive: true,
      flagShow: true,
      image: 'test url image',
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

export function dummyUploadImageCalendarEvent(): Promise<APIBaseResponse<string>> {
  const response = {
    reqId: '413693f6-4903-48c6-8733-25150e748464',
    status: 'T',
    message: 'Berhasil',
    error: null,
    data: 'https://google.com/',
  }

  // return new Promise(function (resolve, reject) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      // reject(new Error('failed update toogle'))
      resolve(response)
    }, 1000)
  })
}

export function dummyDeleteCalendarEvent(): Promise<APIBaseResponse<any>> {
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
