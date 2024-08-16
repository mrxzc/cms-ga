import React, { ComponentPropsWithoutRef, forwardRef } from 'react'
import { joinClass } from '@utils/common'

// Adjust the interface to exclude 'ref'
export interface TextAreaInputProps extends Omit<ComponentPropsWithoutRef<'textarea'>, 'ref'> {
  isLoading?: boolean
  isDisabled?: boolean
  isInvalid?: boolean
  isValid?: boolean
  counter?: boolean
  maxLength?: number
}

// Use the correct type for forwardRef
const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
  (
    {
      className,
      isDisabled,
      isInvalid,
      counter,
      maxLength = 200,
      value, // Access the value prop explicitly
      ...props
    },
    ref
  ) => {
    return (
      <div className="relative">
        <textarea
          ref={ref}
          disabled={isDisabled}
          className={joinClass(
            'w-full py-2 px-3 border rounded-lg outline-none focus:border-primary/60',
            isInvalid ? 'border-error' : 'border-gray-300',
            className
          )}
          rows={props.rows ?? 3}
          {...props} // Spread other props
          value={value} // Set the value prop explicitly
        />
        {counter ? (
          <span className="absolute bottom-2 right-2 text-xs">
            {value?.toString()?.length || 0} / {maxLength}
          </span>
        ) : null}
      </div>
    )
  }
)

TextAreaInput.displayName = 'TextAreaInput'

export default TextAreaInput
