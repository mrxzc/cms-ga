'use client'

import * as Yup from 'yup'

export const schema = Yup.object().shape({
  descGcm: Yup.string().required('Title wajib diisi'),
  capacity: Yup.number().required().typeError('Kapasitas wajib diisi'),
  carBrand: Yup.object()
    .shape({
      noSr: Yup.string().required(),
      descGcm: Yup.string().required(),
    })
    .required()
    .typeError('Brand mobil wajib dipilih'),
  noSr: Yup.string().required('ID wajib diisi'),
})
