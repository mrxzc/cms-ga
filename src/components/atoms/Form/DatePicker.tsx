import { MobileDatePicker, MobileDatePickerProps, LocalizationProvider } from '@mui/x-date-pickers'
import React, { PropsWithRef, forwardRef } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

import { joinClass } from '@utils/common'

export interface DatePickerProps extends MobileDatePickerProps<any>, PropsWithRef<any> {
  isValid?: boolean
  isInvalid?: boolean
  propsExtra?: any
  placeholder?: string
}

const DatePicker: React.FC<DatePickerProps> = forwardRef(({ isInvalid, placeholder, className, ...props }, ref) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        inputRef={ref as React.Ref<HTMLInputElement> | null}
        {...props}
        slotProps={{
          textField: {
            placeholder,
            error: isInvalid,
            size: 'small',
            className: joinClass('custom-textfield', className as string),
          },
        }}
        defaultValue={dayjs()}
        className="w-full"
      />
    </LocalizationProvider>
  )
})

DatePicker.displayName = 'DatePicker'

export default DatePicker
