import React, { HTMLProps } from 'react'
import { Control, Controller } from 'react-hook-form'
import Radio, { RadioProps } from './Radio'

interface FieldInput extends RadioProps {
  label: string
  value: string | number
  checked?: boolean
}

interface IProps extends HTMLProps<HTMLDivElement> {
  fieldInput: FieldInput[]
  control: Control<any>
  name: string
}

export default function RadioForm({ fieldInput, control, name, ...props }: IProps) {
  return (
    <div {...props}>
      <Controller
        control={control}
        name={name}
        render={({ field, formState: { errors } }) => (
          <>
            <div className={`flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-7 mt-1`}>
              {fieldInput.map(item => (
                <label key={`radio-item-${item.value}`} className="flex flex-row gap-1 items-center cursor-pointer">
                  <Radio
                    {...field}
                    {...item}
                    checked={field.value === item.value}
                    className="max-h-[16px] max-w-[16px]"
                    isInvalid={Boolean(errors?.[name]?.message)}
                  />
                </label>
              ))}
            </div>
            {errors?.[name]?.message && (
              <span className="text-xs text-error">{errors?.[name]?.message?.toString()}</span>
            )}
          </>
        )}
      />
    </div>
  )
}
