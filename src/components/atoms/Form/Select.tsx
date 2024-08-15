import IconChevronBottom from '@assets/icons/IconChevronBottom'
import { joinClass } from '@utils/common'
import React, { PropsWithRef, forwardRef } from 'react'
import ReactSelect, { Props as ReactSelectProps, components } from 'react-select'

export interface SelectProps extends ReactSelectProps, PropsWithRef<any> {
  isValid?: boolean
  isInvalid?: boolean
  propsExtra?: any
}

const SelectInput: React.FC<SelectProps> = forwardRef(({ isValid, isInvalid, propsExtra, name, ...props }, ref) => {
  return (
    <ReactSelect
      menuShouldBlockScroll
      instanceId={name}
      ref={ref}
      {...props}
      {...propsExtra}
      styles={{
        option: styles => ({ ...styles, fontSize: 14 }),
        singleValue: styles => ({ ...styles, fontSize: 14 }),
        placeholder: styles => ({
          ...styles,
          fontSize: 14,
        }),
        indicatorSeparator: provided => ({
          ...provided,
          display: 'none',
        }),
        indicatorsContainer: styles => ({
          ...styles,
          padding: '0px 8px',
        }),
        dropdownIndicator: styles => ({
          ...styles,
          padding: 0,
        }),
        container: () => ({
          position: 'static',
          boxSizing: 'border-box',
          // zIndex: 3,
        }),
        menu: () => ({
          position: 'absolute',
          width: '100%',
          background: 'white',
          border: '1px solid #eee',
          top: '5px',
          // borderRadius: '8px',
        }),
        control: provided => ({
          ...provided,
          // borderRadius: '0.5rem',
          border: `1px solid ${joinClass(isInvalid ? '#ee4620' : isValid ? '#49d475' : '#d1d5db')}`,
          outline: 'none',
          boxShadow: 'none',
        }),

        ...props.styles,
      }}
      menuPosition="fixed"
      menuShouldScrollIntoView={true}
      components={{ DropdownIndicator }}
    />
  )
})

const DropdownIndicator = (e: any) => {
  return (
    <components.DropdownIndicator {...e}>
      {e?.selectProps?.menuIsOpen ? (
        <IconChevronBottom
          name="arrow-down"
          className="rotate-180 transition-transform duration-500 max-w-[16px] max-h-5"
        />
      ) : (
        <IconChevronBottom
          name="arrow-down"
          className="rotate-0 transition-transform duration-500 max-w-[16px] max-h-5"
        />
      )}
    </components.DropdownIndicator>
  )
}

SelectInput.displayName = 'Select'

export default SelectInput
