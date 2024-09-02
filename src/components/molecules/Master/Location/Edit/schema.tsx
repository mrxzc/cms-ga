'use client'

import * as Yup from 'yup'

export const schema = Yup.object().shape({
  descGcm: Yup.string().required('Judul wajib diisi'),
  noSr: Yup.string().required('ID wajib diisi'),
})
