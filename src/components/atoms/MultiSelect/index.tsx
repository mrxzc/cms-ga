import React, { useState, useCallback, useEffect } from 'react'
import { Control, Controller, useController } from 'react-hook-form'
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
import IconClose from '@assets/icons/IconClose'

interface RHFMultiSelectProps {
  data: { value: string; name: string; selectedValue?: boolean }[]
  className?: string
  name: string
  label: string
  control: Control<any>
  choosedValue?: string[]
  onValuesChange?: (values: string[]) => void
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

function useSyncedSelectedValues(control: any, name: string, selectedValues: string[]) {
  const { field } = useController({
    name,
    control,
    defaultValue: selectedValues,
  })

  useEffect(() => {
    field.onChange(selectedValues)
  }, [selectedValues, field.onChange])

  return field
}

const RHFMultiSelect: React.FC<RHFMultiSelectProps> = ({
  data,
  className,
  name,
  label,
  control,
  onValuesChange,
  choosedValue,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(choosedValue || [])

  const isAllSelected = data.length > 0 && selectedValues.length === data.length
  const labelId = `${name}-label`
  const field = useSyncedSelectedValues(control, name, selectedValues)

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const newSelectedValues = event.target.value as string[]
    const allValues = isAllSelected ? [] : data.map(item => item.value)

    setSelectedValues(newSelectedValues.includes('all') ? allValues : newSelectedValues)

    if (onValuesChange) {
      onValuesChange(newSelectedValues)
    }
  }

  const handleDelete = useCallback(
    (valueToDelete: string) => () => {
      const updatedSelected = selectedValues.filter(value => value !== valueToDelete)
      setSelectedValues(updatedSelected)
      field.onChange(updatedSelected)
    },
    [selectedValues, field.onChange]
  )

  useEffect(() => {
    // Update selectedValues ketika choosedValue berubah
    if (choosedValue) {
      setSelectedValues(choosedValue)
    }
  }, [choosedValue])

  return (
    <FormControl className={className}>
      <Controller
        name={name}
        control={control}
        defaultValue={selectedValues}
        render={({ fieldState: { error } }) => (
          <>
            <Select
              {...field}
              multiple
              labelId={labelId}
              value={selectedValues}
              onChange={handleChange}
              renderValue={selected => (
                <div className="flex gap-2">
                  {selected.map(value => {
                    const selectedItem = data.find(item => item.value === value)
                    return (
                      <div key={value} className="relative">
                        <div className="flex border border-[#5141fe] rounded-md bg-white">
                          <div className="flex items-center rounded-l-lg p-1">
                            <button
                              onClick={handleDelete(value)}
                              className="w-[12px] h-[12px] hover:cursor-pointer z-[999]"
                              type="button"
                            >
                              <IconClose />
                            </button>
                          </div>
                          <p className="text-[#5141fe] py-2 pr-2 pl-2 text-extra-small regular-12 border-l-[1px] border-[#5141fe]">
                            {selectedItem?.name}
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
