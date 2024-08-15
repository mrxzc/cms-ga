import { toast } from 'react-toastify'
import Base64 from '@utils/helper/Base64'

class SimpleUploadAdapter {
  loader: any

  constructor(loader: any) {
    this.loader = loader
  }

  async upload() {
    return this.loader.file.then(async (file: any) => {
      if (file.size > 5 * 1024 * 1024) {
        return Promise.reject('Ukuran file melebihi 5MB.')
      }

      const acceptedTypes = ['image/png', 'image/jpeg', 'image/jpg']
      if (!acceptedTypes.includes(file.type)) {
        return Promise.reject('Jenis file tidak didukung. Harap unggah file PNG, JPEG, atau JPG.')
      }

      const base64StringFile = (await Base64(file)) as string

      return {
        default: base64StringFile,
      }
    })
  }

  abort() {
    toast.error('Cancel Upload', {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

export default SimpleUploadAdapter
