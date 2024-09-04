'use client'

import * as Yup from 'yup'

export const schema = Yup.object().shape({
  title: Yup.string().required('Title wajib diisi'),
  description: Yup.string().nullable(),
  image: Yup.string().required('Gambar wajib diisi'),
  flagActive: Yup.boolean().required(),
  flagShow: Yup.boolean().required(),
})
