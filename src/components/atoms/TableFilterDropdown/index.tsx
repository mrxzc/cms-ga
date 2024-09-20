import IconSearch from '@assets/icons/IconSearch'
import IconSpinner from '@assets/icons/IconSpinner'
import React, { useEffect, useState } from 'react'

export interface TableFilterDropdownProps<T> {
  data?: T extends undefined ? never : T
  value?: T extends undefined ? never : T
  labelField: string
  valueField: string
  onValueSelected: (value: T) => void
  onFilterChanged?: (value: string) => void
  onClosed?: () => void
  filterable?: boolean
  placeholder?: string
  filterKey: string
  isLoading: boolean
  isOpen: boolean
  classContainer?: string
}

const TableFilterDropdown: React.FC<TableFilterDropdownProps<any>> = ({
  data,
  value,
  labelField,
  valueField,
  filterable,
  isLoading,
  isOpen,
  placeholder = 'Cari',
  onValueSelected,
  onFilterChanged,
  onClosed,
  filterKey,
  classContainer = 'bg-white rounded-lg shadow-md max-h-40 min-w-64 border border-[#E6E5E6]',
}) => {
  const [keyword, setKeyword] = useState<string>()

  const handleCheckData = (selectedVal: any) => {
    return value?.find((val: any) => val[valueField] == selectedVal)
  }

  useEffect(() => {
    if (!isOpen) {
      setKeyword('')
      if (onClosed) onClosed()
    }
  }, [isOpen])

  return (
    <>
      {isOpen && (
        <div className={classContainer}>
          {filterable && (
            <div className="search-input h-[38px] mb-2 px-3 flex items-center justify-center space-x-3 border border-[#D5D5D5] rounded-lg mx-2 mt-3">
              <input
                type="text"
                placeholder={placeholder}
                className="flex-1 text-paragraph regular-14"
                value={keyword ?? ''}
                onChange={e => {
                  setKeyword(e?.target?.value)
                  onFilterChanged && onFilterChanged(e?.target?.value)
                }}
              />

              <IconSearch color="#909090" />
            </div>
          )}

          {isLoading && (
            <div className="flex items-center justify-center my-8">
              <IconSpinner width={32} height={32} className="animate-spin"></IconSpinner>
            </div>
          )}

          {!isLoading && data?.length ? (
            data?.map((val: any, index: number) => (
              <div key={filterKey + '-' + index}>
                {valueField in val && labelField in val && (
                  <div className={`px-4 py-2 ${handleCheckData(val[valueField]) ? 'bg-[#BDE4F9]' : ''}`}>
                    <label
                      className={`flex-1 flex items-center custom-checkbox text-paragraph  ${handleCheckData(val[valueField]) ? 'semibold-14 text-[#235696]' : 'regular-14 text-[#252525]'}`}
                    >
                      <span>{val[labelField]}</span>
                      <input
                        type="checkbox"
                        onClick={() => {
                          onValueSelected && onValueSelected(val)
                        }}
                        readOnly={true}
                        checked={handleCheckData(val[valueField]) || false}
                        name="checkmark"
                      />
                      <span className="-mt-0.5 checkmark"></span>
                    </label>
                  </div>
                )}
              </div>
            ))
          ) : (
            <></>
          )}

          {!isLoading && !data?.length && <div className="text-center justify-center my-8">Tidak ada data</div>}
        </div>
      )}
    </>
  )
}

export default TableFilterDropdown
