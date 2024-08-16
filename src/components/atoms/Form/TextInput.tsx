import { joinClass } from '@utils/common'
import React, { ComponentPropsWithRef, FC, LegacyRef, forwardRef } from 'react'

export interface TextInputProps extends Omit<ComponentPropsWithRef<'input'>, 'ref'> {
  isLoading?: boolean
  type?: 'text' | 'tel' | 'email' | 'number' | 'password' | 'time'
  isDisabled?: boolean
  isInvalid?: boolean
  isValid?: boolean
}

const TextInput: FC<TextInputProps> = forwardRef(
  ({ className, isDisabled, isInvalid, isValid, ...props }, ref: LegacyRef<HTMLInputElement>) => {
    return (
      <input
        ref={ref}
        disabled={isDisabled}
        className={joinClass(
          'w-full py-2 px-3 border rounded outline-none focus:border-accent/60',
          'disabled:bg-gray-200 disabled:text-gray-400',
          isInvalid ? 'border-error' : isValid ? 'border-accent' : 'border-gray-300',
          className
        )}
        {...props}
      />
    )
  }
)

TextInput.displayName = 'TextInput'

export default TextInput
