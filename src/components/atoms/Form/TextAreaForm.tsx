import React, { HTMLProps } from 'react'
import TextAreaInput, { TextAreaInputProps } from './TextArea'
import { Control, Controller } from 'react-hook-form'
import { joinClass } from '@utils/common'
import { LabelProps } from './Label'

interface FieldInput extends TextAreaInputProps {
  type?: 'text' | 'email' | 'tel'
}

export interface TextAreaFormProps extends HTMLProps<HTMLDivElement> {
  fieldLabel?: LabelProps
  fieldInput?: FieldInput
  control: Control<any>
  name: string
  counter?: boolean
}

const TextAreaForm: React.FC<TextAreaFormProps> = ({ fieldLabel, fieldInput, control, name, counter, ...props }) => {
  return (
    <div {...props}>
      <Controller
        defaultValue={''}
        control={control}
        name={name}
        render={({ field, formState: { errors } }) => (
          <>
            <TextAreaInput
              {...field}
              {...fieldInput}
              placeholder={fieldInput?.placeholder ?? `Masukkan ${fieldLabel?.children}`}
              className={joinClass('mt-1 -mb-2')}
              isInvalid={Boolean(errors?.[name]?.message)}
              counter={counter}
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

export default TextAreaForm
