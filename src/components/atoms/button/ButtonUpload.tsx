import IconAlertButtonUpload from '@assets/icons/IconAlertButtonUpload'
import IconCameraUpload from '@assets/icons/IconCameraUpload'

interface ButtonUploadProps {
  mainText?: string
  verificationText?: string
  containerClass?: string
  buttonClass?: string
  mainTextClass?: string
  verificationTextClass?: string
  isError?: boolean
  showIconAlert?: boolean
  onClick?: () => void
}

const ButtonUpload = ({
  mainText,
  verificationText = 'Menunggu Verifikasi',
  containerClass = '',
  buttonClass = '',
  mainTextClass = '',
  verificationTextClass = '',
  isError = false,
  showIconAlert = false,
  onClick,
}: ButtonUploadProps) => {
  return (
    <div className={`flex flex-col items-start ${containerClass}`}>
      <button onClick={onClick} className="w-full" type="button">
        <div
          className={`flex items-center border-2 ${
            isError ? 'border-red-500' : 'border-[#dcdfe4]'
          } p-2 rounded relative w-full justify-between ${buttonClass}`}
        >
          <IconCameraUpload className="w-6 h-6 mr-2.5" />
          {mainText && (
            <span className={`flex-grow text-paragraph regular-14 text-black text-left ${mainTextClass}`}>
              {mainText}
            </span>
          )}
          {isError && showIconAlert && <IconAlertButtonUpload className="w-6 h-6" />}
        </div>
      </button>
      {isError && verificationText && (
        <div className={`text-red-500 text-sm mt-1.5 ${verificationTextClass}`}>{verificationText}</div>
      )}
    </div>
  )
}

export default ButtonUpload
