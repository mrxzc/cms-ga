'use client'

import * as Yup from 'yup'

export const schema = Yup.object().shape({
  notes: Yup.string().required('Catatan wajib diisi'),
})
