import { joinClass } from '@utils/common'
import React, { useState, useRef, useEffect } from 'react'

interface OTPInputProps {
  length: number
  onComplete: (otp: string) => void
  isError: any
  onhandleChange: any
  isDisable: any
  isClearOTP: any
}

const OTPInput: React.FC<OTPInputProps> = ({ length, onComplete, isError, onhandleChange, isDisable, isClearOTP }) => {
  const [otp, setOTP] = useState<string[]>(Array(length).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(length).fill(null))

  const handleInputChange = (index: number, value: string) => {
    onhandleChange()
    const newOTP = [...otp]
    newOTP[index] = value
    setOTP(newOTP)

    // Move to the next input field
    if (value !== '' && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleBackspace = (index: number) => {
    const newOTP = [...otp]
    newOTP[index] = ''

    // Move to the previous input field
    if (index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus()
    }

    setOTP(newOTP)
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text/plain').slice(0, length)

    const newOTP = [...otp]
    for (let i = 0; i < length; i++) {
      newOTP[i] = pastedData[i] || ''
    }

    setOTP(newOTP)
  }

  const handleComplete = () => {
    const enteredOTP = otp.join('')
    onComplete(enteredOTP)
  }

  useEffect(() => {
    // Check if all OTP fields are filled
    if (otp.every(value => value !== '')) {
      handleComplete()
    }
  }, [otp, handleComplete])

  const clearOTP = () => {
    setOTP(Array(length).fill(''))
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }

  useEffect(() => {
    clearOTP()
  }, [isClearOTP])

  return (
    <div className="flex justify-between">
      {otp.map((value, index) => (
        <input
          // className={"border-2 px-1 h-16 w-12 text-[2.25rem] rounded-lg font-bold border-[#C2C2C2] text-center" }
          className={joinClass(
            'border-2 px-1 h-16 w-12 text-[2.25rem] rounded-lg font-bold border-[#C2C2C2] text-center',
            isError ? 'border-red-500' : '',
            isDisable ? 'bg-[#EDEDED]' : ''
          )}
          key={index}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={value}
          onChange={e => handleInputChange(index, e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Backspace' && value === '') {
              handleBackspace(index)
            }
          }}
          onPaste={handlePaste}
          ref={(ref: any) => (inputRefs.current[index] = ref)}
          disabled={isDisable}
        />
      ))}
    </div>
  )
}

export default OTPInput
