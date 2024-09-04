import { APIBaseResponse } from '@interfaces/api'
import { IAssessmentCriteriaResponse, IAssessmentData, IAssessmentList } from '@interfaces/assesment'

export function dummyGetAssessmentList(): Promise<APIBaseResponse<IAssessmentList[]>> {
  const response = {
    reqId: '126d9879-889e-4239-91d3-fd470b7b1ce1',
    status: 'T',
    message: 'Berhasil',
    error: null,
    data: [
      {
        assessmentId: 1,
        year: 2024,
        quarter: 1,
      },
      {
        assessmentId: 2,
        year: 2024,
        quarter: 2,
      },
      {
        assessmentId: 3,
        year: 2024,
        quarter: 3,
      },
      {
        assessmentId: 4,
        year: 2024,
        quarter: 4,
      },
      {
        assessmentId: 1 + 4,
        year: 2025,
        quarter: 1,
      },
      {
        assessmentId: 2 + 4,
        year: 2025,
        quarter: 2,
      },
      {
        assessmentId: 3 + 4,
        year: 2025,
        quarter: 3,
      },
      {
        assessmentId: 4 + 4,
        year: 2025,
        quarter: 4,
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

export function dummyGetAssessmentData(): Promise<APIBaseResponse<IAssessmentData>> {
  const response = {
    reqId: '413693f6-4903-48c6-8733-25150e748464',
    status: 'T',
    message: 'Berhasil',
    error: null,
    data: {
      quarter: 1,
      year: 2024,
      dtUpload: '2024-08-29 21:24:17',
      assessmentMaster: {
        id: 1,
        name: 'Master Penilaian',
        createdDate: '2024-08-29 21:24:17',
      },
      assessments: [
        {
          id: 1,
          label: 'Penilaian CS 1',
          criteria: {
            id: 1,
            name: 'Kerapihan',
            description: 'Test description',
          },
        },
        {
          id: 4,
          label: 'Penilaian CS 2',
          criteria: {
            id: 3,
            name: 'Keberanian',
            description: '',
          },
        },
      ],
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

export function dummyInsertAssessmentCriteria(): Promise<APIBaseResponse<IAssessmentCriteriaResponse>> {
  const response = {
    reqId: '413693f6-4903-48c6-8733-25150e748464',
    status: 'T',
    message: 'Berhasil',
    error: null,
    data: {
      criteriaId: 2,
      criteriaName: 'Keadilan',
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

export function dummyUpdateAssessmentCriteria(): Promise<APIBaseResponse<IAssessmentCriteriaResponse>> {
  const response = {
    reqId: '413693f6-4903-48c6-8733-25150e748464',
    status: 'T',
    message: 'Berhasil',
    error: null,
    data: {
      criteriaId: 2,
      criteriaName: 'Keadilan',
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

export function dummyDeleteAssessmentCriteria(): Promise<APIBaseResponse<any>> {
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
