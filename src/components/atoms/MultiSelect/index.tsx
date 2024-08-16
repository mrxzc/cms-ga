import React, { useState, useCallback } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import {
  Checkbox,
  FormControl,
  FormHelperText,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import Image from 'next/image'
import images from '@assets/images'

interface RHFMultiSelectProps {
  data: { value: string; name: string; selectedValue?: boolean }[]
  className?: string
  name: string
  label: string
  control: UseFormReturn<any>['control']
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const RHFMultiSelect: React.FC<RHFMultiSelectProps> = ({ data, className, name, label, control }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(
    data.filter(item => item.selectedValue).map(item => item.value)
  )

  const isAllSelected = data.length > 0 && selectedValues.length === data.length
  const labelId = `${name}-label`

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const newSelectedValues = event.target.value as string[]
    setSelectedValues(
      newSelectedValues.includes('all') ? (isAllSelected ? [] : data.map(item => item.value)) : newSelectedValues
    )
  }

  const handleDelete = useCallback(
    (valueToDelete: string, onChange: (value: string[]) => void) => () => {
      const updatedSelected = selectedValues.filter(value => value !== valueToDelete)
      setSelectedValues(updatedSelected)
      onChange(updatedSelected)
    },
    [selectedValues]
  )

  return (
    <FormControl className={className}>
      <Controller
        name={name}
        control={control}
        defaultValue={selectedValues}
        render={({ field, fieldState: { error } }) => (
          <>
            <Select
              {...field}
              multiple
              labelId={labelId}
              value={selectedValues}
              onChange={handleChange}
              renderValue={selectedValues => (
                <div className="flex gap-2">
                  {selectedValues.map(value => {
                    const selectedItem = data.find(item => item.value === value)
                    return (
                      <div key={value}>
                        <div className="flex border border-[#5141fe] rounded-md bg-white">
                          <div className="flex items-center rounded-l-lg p-1">
                            <Image
                              src={images.ERASE_IMAGE}
                              width={12}
                              height={12}
                              alt="Delete Icon"
                              className="hover:cursor-pointer z-[9999]"
                              onClick={handleDelete(value, field.onChange)}
                            />
                          </div>
                          <p className="text-[#5141fe] py-2 pr-2 pl-2 text-extra-small regular-12 border-l-[1px] border-[#5141fe]">
                            {selectedItem?.name} {/* Display the name here */}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
              MenuProps={MenuProps}
              inputProps={{ placeholder: label }}
              className="min-w-[650px]"
            >
              {data.map(item => (
                <MenuItem key={item.value} value={item.value}>
                  <ListItemIcon>
                    <Checkbox checked={selectedValues.includes(item.value)} />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </MenuItem>
              ))}
            </Select>
            {error && <FormHelperText error={!!error}>{error.message}</FormHelperText>}
          </>
        )}
      />
    </FormControl>
  )
}

export default RHFMultiSelect
