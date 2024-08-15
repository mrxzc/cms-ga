import React, { HTMLProps } from 'react'
import Label, { LabelProps } from './Label'
import { Control, Controller } from 'react-hook-form'
import DatePicker from './DatePicker'

interface DatePickerFormProps extends HTMLProps<HTMLDivElement> {
  fieldLabel?: LabelProps
  control: Control<any>
  name: string
  placeholder?: string
  disableFuture?: boolean
  disablePast?: boolean
  format?: string
  minDate?: any
  maxDate?: any
}

const DatePickerForm: React.FC<DatePickerFormProps> = ({
  fieldLabel,
  control,
  name,
  placeholder,
  disableFuture,
  disablePast,
  format = 'ddd, DD MMM YYYY',
  minDate,
  maxDate,
  ...props
}) => {
  return (
    <div {...props}>
      {fieldLabel && <Label {...fieldLabel} />}
      <Controller
        control={control}
        name={name}
        defaultValue={null}
        render={({ field: { value, name, onBlur, ref, onChange }, formState: { errors } }) => (
          <>
            <DatePicker
              name={name}
              className="w-full mt-1"
              value={value}
              onBlur={onBlur}
              ref={ref}
              format={format}
              onChange={onChange}
              isInvalid={Boolean(errors?.[name]?.message)}
              placeholder={placeholder ?? `Pilih ${fieldLabel?.children}`}
              disableFuture={disableFuture}
              disablePast={disablePast}
              minDate={minDate}
              maxDate={maxDate}
              disabled={props.disabled}
            />
            {errors?.[name]?.message && <span className="text-xs text-error">{errors[name]?.message?.toString()}</span>}
          </>
        )}
      />
    </div>
  )
}

export default DatePickerForm
