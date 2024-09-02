'use client'

import * as Yup from 'yup'

export const schema = Yup.object().shape({
  descGcm: Yup.string().required('Brand mobil wajib diisi'),
  noSr: Yup.string().required('ID wajib diisi'),
})
