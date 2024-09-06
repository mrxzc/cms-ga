'use client'

import * as Yup from 'yup'

export const insertSchema = Yup.object().shape({
  assessmentId: Yup.number().required('Kategori penilaian wajib dipilih'),
  criteriaName: Yup.string().required('Nama penilaian wajib diisi'),
})

export const updateSchema = Yup.object().shape({
  criteriaId: Yup.number().required('Kategori penilaian wajib dipilih'),
  criteriaName: Yup.string().required('Nama penilaian wajib diisi'),
})
