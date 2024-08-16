import { joinClass } from '@utils/common'
import React, { ComponentPropsWithRef, FC, useMemo } from 'react'

export interface LabelProps extends ComponentPropsWithRef<'label'> {
  required?: boolean
  help?: string
  tooltipClassname?: string
  helpType?: 'info' | 'question' | 'info-fill'
}

const Label: FC<LabelProps> = ({ className, children, required = false, ...props }) => {
  const star = useMemo(() => {
    if (required) return <span className="text-red-600">*</span>
    return null
  }, [required])

  return (
    <label className={joinClass('font-medium text-xs flex items-center', className)} {...props}>
      {children}
      {star}
    </label>
  )
}

export default Label
