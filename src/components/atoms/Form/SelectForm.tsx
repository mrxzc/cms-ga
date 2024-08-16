import React, { HTMLProps } from 'react'
import Label, { LabelProps } from './Label'
import { Control, Controller, UseFormSetValue } from 'react-hook-form'
import Select, { SelectProps } from './Select'
import { LabelValueProps } from '@interfaces/select'

interface IProps extends HTMLProps<HTMLDivElement> {
  fieldLabel?: LabelProps
  fieldInput?: SelectProps
  control: Control<any>
  name: string
  setValue: UseFormSetValue<any>
  options: LabelValueProps[]
  placeholder?: string
  isSearchable?: boolean
  onChangeValue?: (value: string | number) => void
  isDisabled?: boolean
  isLoading?: boolean
}

export default function SelectForm({
  fieldLabel,
  fieldInput,
  control,
  name,
  options,
  setValue,
  placeholder,
  isSearchable = true,
  onChangeValue = () => {},
  isDisabled = false,
  isLoading,
  ...props
}: IProps) {
  return (
    <div {...props}>
      {fieldLabel && <Label {...fieldLabel} />}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, name, onBlur, ref }, formState: { errors } }) => (
          <>
            <Select
              {...fieldInput}
              name={name}
              className="mt-1"
              value={value}
              onBlur={onBlur}
              ref={ref}
              isSearchable={isSearchable}
              onChange={(value: any) => {
                setValue(name, value, { shouldValidate: true })
                onChangeValue(value?.value)
              }}
              isInvalid={Boolean(errors?.[name]?.message)}
              options={options}
              placeholder={placeholder ?? `Pilih ${fieldLabel?.children}`}
              isDisabled={isDisabled}
              isLoading={isLoading}
              styles={{}}
            />
            {errors?.[name]?.message && (
              <span className="text-xs text-error">{errors?.[name]?.message?.toString()}</span>
            )}
          </>
        )}
      />
    </div>
  )
}
