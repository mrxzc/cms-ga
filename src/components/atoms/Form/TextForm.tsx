import React, { HTMLProps, useState } from 'react'
import Label, { LabelProps } from './Label'
import TextInput, { TextInputProps } from './TextInput'
import { Control, Controller } from 'react-hook-form'
import { joinClass } from '@utils/common'
import { IconEyeHide, IconEyeShow } from '../Icon'

interface FieldInput extends TextInputProps {
  type?: 'text' | 'email' | 'tel' | 'password' | 'number' | 'time'
}

export interface TextFormProps extends HTMLProps<HTMLDivElement> {
  fieldLabel?: LabelProps
  fieldInput?: FieldInput
  control: Control<any>
  name: string
  prefix?: string
  suffix?: string
  notes?: string
  customError?: any
  regexReplace?: RegExp
  isInvalid?: any
  percentage?: boolean
  maxChar?: number
  rupiah?: boolean
}

const TextForm: React.FC<TextFormProps> = ({
  fieldLabel,
  fieldInput,
  control,
  name,
  prefix,
  suffix,
  notes,
  customError,
  regexReplace,
  isInvalid,
  percentage,
  maxChar,
  rupiah,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div {...props}>
      {fieldLabel && <Label {...fieldLabel} />}
      <Controller
        defaultValue={''}
        control={control}
        name={name}
        render={({ field, formState: { errors } }) => (
          <>
            <div
              className={joinClass('flex items-center relative', prefix && 'input-prefix', suffix && 'input-suffix')}
            >
              {prefix && <span>{prefix}</span>}
              <TextInput
                {...field}
                {...fieldInput}
                onChange={e => {
                  if (!e.target.value?.replace(/\s/g, '').length) {
                    field.onChange(e.target.value?.trim())
                  } else if (regexReplace) {
                    field.onChange(e.target.value.replace(regexReplace, ''))
                  } else {
                    field.onChange(e)
                  }
                }}
                type={fieldInput?.type === 'password' && showPassword ? 'text' : fieldInput?.type}
                placeholder={fieldInput?.placeholder ?? `Masukkan ${fieldLabel?.children}`}
                className={joinClass('mt-1', `${rupiah ? 'pl-10' : ''}`)}
                isInvalid={Boolean(errors?.[name]?.message) || isInvalid}
                maxLength={maxChar}
              />
              {percentage && (
                <div className="absolute right-[0.8px] translate-y-[-45%] top-[50%]">
                  <span className="text-[#757575] text-[12px] bg-secondary px-3 pt-[10px] pb-[9px] rounded-lg">%</span>
                </div>
              )}

              {rupiah && (
                <div className="absolute left-[0.8px] translate-y-[-45%] top-[50%]">
                  <span className="text-[#757575] text-[12px] bg-secondary px-3 pt-[10px] pb-[9px] rounded-lg">Rp</span>
                </div>
              )}

              {fieldInput?.type === 'password' && (
                <button
                  type="button"
                  className="absolute bottom-[0.35rem] right-2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword
                    ? IconEyeShow({ color: '#757575', height: 24, width: 24 })
                    : IconEyeHide({ color: '#757575', height: 24, width: 24 })}
                </button>
              )}
              {suffix && <span>{suffix}</span>}

              {/* Counter */}
              {maxChar && (
                <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                  {field.value?.length || 0}/{maxChar}
                </div>
              )}
            </div>
            {notes && !errors?.[name]?.message && !customError?.[name]?.message && (
              <span className="text-xs text-[#676869]">{notes}</span>
            )}
            {fieldLabel?.children != 'Password'
              ? (errors?.[name]?.message || customError?.[name]?.message) && (
                  <span className="text-xs text-error">
                    {errors?.[name]?.message?.toString() ?? customError?.[name]?.message?.toString()}
                  </span>
                )
              : ''}
          </>
        )}
      />
    </div>
  )
}

export default TextForm
