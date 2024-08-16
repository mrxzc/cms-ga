import React, { ComponentPropsWithoutRef, forwardRef } from 'react'
import { joinClass } from '@utils/common'

// Adjust the interface for forwardRef
export interface RadioProps extends Omit<ComponentPropsWithoutRef<'input'>, 'checked'> {
  checked?: boolean
  label?: React.ReactNode
  isInvalid?: boolean
  isValid?: boolean
}

// Use the correct type for the forwardRef component
const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, isValid, isInvalid, checked, ...props }, ref) => {
    return (
      <div className="form-control">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            ref={ref}
            className={joinClass(
              'peer checked:bg-primary radio radio-xs rounded-full w-6 h-6',
              isInvalid ? 'border-error' : isValid ? 'border-success' : '',
              className
            )}
            type="radio"
            checked={checked}
            {...props}
          />
          <span className="text-base font-nunito peer-checked:text-primary">{label}</span>
        </label>
      </div>
    )
  }
)

Radio.displayName = 'Radio'

export default Radio
