import React, { useState, useRef } from 'react'
import moment from 'moment'
import IconChevronBottom from '@assets/icons/IconChevronBottom'

interface DateRangePickerProps {
  params: any
  setParams: (newParams: any) => void
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ params, setParams }) => {
  const [isStartDateOpen, setIsStartDateOpen] = useState(false)
  const [isEndDateOpen, setIsEndDateOpen] = useState(false)
  const inputStartDateRef = useRef<HTMLInputElement>(null)
  const inputEndDateRef = useRef<HTMLInputElement>(null)
  const inputStartDateContainerRef = useRef<HTMLDivElement>(null)
  const inputEndDateContainerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="flex items-center space-x-2">
      <div ref={inputStartDateContainerRef}>
        <div className="text-paragraph regular-14 mb-1">Start Date</div>
        <div
          onKeyDown={() => {}}
          onClick={() => {
            setIsStartDateOpen(true)
            inputStartDateRef?.current?.showPicker()
          }}
          className="transition-all duration-300 cursor-pointer search-input h-[38px] w-auto px-3 flex items-center justify-center space-x-3 border border-[#D5D5D5] rounded"
        >
          <span className={`text-paragraph regular-14 ${params?.startDate ? 'text-[#0C0C0C]' : 'text-[#B1B1B1]'} mr-2`}>
            {params?.startDate ? moment(params?.startDate).format('DD/MM/YYYY').toString() : 'DD/MM/YYYY'}
          </span>
          <IconChevronBottom
            width={21}
            height={21}
            className={`${isStartDateOpen ? 'rotate-180' : 'rotate-0'} transition-all duration-300`}
          ></IconChevronBottom>
        </div>
        <input
          ref={inputStartDateRef}
          className="h-0 w-0"
          type="date"
          onChange={e => {
            setParams({
              ...params,
              page: 1,
              startDate: moment(e?.target?.value).format('YYYY-MM-DD HH:mm:ss').toString(),
            })
            setIsStartDateOpen(false)
          }}
        />
      </div>

      <div className="text-paragraph regular-14 mt-4">To</div>

      <div ref={inputEndDateContainerRef}>
        <div className="text-paragraph regular-14 mb-1">End Date</div>
        <div
          onKeyDown={() => {}}
          onClick={() => {
            setIsEndDateOpen(true)
            inputEndDateRef?.current?.showPicker()
          }}
          className="transition-all duration-300 cursor-pointer search-input h-[38px] w-auto px-3 flex items-center justify-center space-x-3 border border-[#D5D5D5] rounded"
        >
          <span className={`text-paragraph regular-14 ${params?.endDate ? 'text-[#0C0C0C]' : 'text-[#B1B1B1]'} mr-2`}>
            {params?.endDate ? moment(params?.endDate).format('DD/MM/YYYY').toString() : 'DD/MM/YYYY'}
          </span>
          <IconChevronBottom
            width={21}
            height={21}
            className={`${isEndDateOpen ? 'rotate-180' : 'rotate-0'} transition-all duration-300`}
          ></IconChevronBottom>
        </div>
        <input
          ref={inputEndDateRef}
          className="h-0 w-0"
          type="date"
          onChange={e => {
            setParams({
              ...params,
              page: 1,
              endDate: moment(e?.target?.value).format('YYYY-MM-DD HH:mm:ss').toString(),
            })
            setIsEndDateOpen(false)
          }}
        />
      </div>
    </div>
  )
}

export default DateRangePicker
