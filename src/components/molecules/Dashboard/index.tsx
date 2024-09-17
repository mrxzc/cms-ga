'use client'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'

import MetricButton from '@components/atoms/MetricButton'
import DashboardCard from '@components/atoms/DashboardCard'
import SelectInput from '@components/atoms/Form/Select'
import IconChevronBottom from '@assets/icons/IconChevronBottom'
import { useGetLocation } from '@services/gcm/location/query'
import { IGcmLocationListParams } from '@interfaces/gcmLocation'
import { OptionItem } from '@interfaces/utils'
import { dataRoom } from './data'

export function Dashboard() {
  const defaultParams = {
    search: '',
    page: 1,
    size: 10,
  }

  const date = {
    startDate: '',
  }

  const [activeButton, setActiveButton] = useState('room')
  const [optionsLocation, setOptionsLocation] = useState<OptionItem[]>([])
  const [params] = useState<IGcmLocationListParams>(defaultParams)
  const [dates, setDates] = useState<any>(date)

  const [selectedOption, setSelectedOption] = useState(null)

  const inputStartDateRef = useRef<any>(null)
  const inputStartDateContainerRef = useRef<HTMLDivElement>(null)

  const [isStartDateOpen, setIsStartDateOpen] = useState<boolean>(false)

  const { data: locations } = useGetLocation(params)

  useEffect(() => {
    if (locations && locations.data) {
      const transformedOptions: OptionItem[] = locations.data
        .filter(item => item.flagActive)
        .map(item => ({
          label: item.descGcm,
          value: item.noSr,
        }))
      setOptionsLocation(transformedOptions)
    }
  }, [locations])

  useEffect(() => {
    const handleClick = (event: any) => {
      if (!inputStartDateContainerRef?.current?.contains(event?.target)) {
        setIsStartDateOpen(false)
      }
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [isStartDateOpen])

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault()
  }

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption)
  }

  const breadcrumbs = [
    <Link underline="none" color="#000" href="/" onClick={handleClick} key="1" className="text-extra-small regular-12">
      Dashboard
    </Link>,
  ]

  return (
    <div className="px-4 pt-8 pb-4 bg-[#f6f6f6] h-screen w-full flex flex-col">
      <div className="bg-white px-4 py-4 rounded-xl mb-4 text-[#235696] flex justify-between">
        <Stack spacing={2}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </div>

      <div className="bg-white px-4 py-4 rounded-xl flex-grow ">
        <p className="text-heading s semibold-18 mb-4">Stock Booking Asset</p>

        {/* Filter Location and Date */}
        <div className="flex gap-4 ">
          <div className="min-w-[230px]">
            <p>Lokasi</p>
            <SelectInput name="mySelect" options={optionsLocation} value={selectedOption} onChange={handleChange} />
          </div>
          <div>
            <p>Tanggal</p>
            <div ref={inputStartDateContainerRef}>
              <div
                onKeyDown={() => {}}
                onClick={() => {
                  setIsStartDateOpen(true)
                  inputStartDateRef?.current?.showPicker()
                }}
                className="transition-all duration-300 cursor-pointer search-input h-[38px] w-auto px-3 flex items-center justify-center space-x-3 border border-[#D5D5D5] rounded"
              >
                <span
                  className={`text-paragraph regular-14 ${dates?.startDate ? 'text-[#0C0C0C]' : 'text-[#B1B1B1]'} mr-2`}
                >
                  {dates?.startDate ? moment(dates?.startDate).format('DD/MM/YYYY').toString() : 'DD/MM/YYYY'}
                </span>
                <IconChevronBottom
                  width={21}
                  height={21}
                  className={`${isStartDateOpen ? 'rotate-180' : 'rotate-0'} transition-all duration-300`}
                />
              </div>
              <input
                ref={inputStartDateRef}
                className="h-0 w-0"
                type="date"
                onChange={e => {
                  setDates({
                    ...date,
                    startDate: moment(e?.target?.value).format('YYYY-MM-DD HH:mm:ss').toString(),
                  })
                  setIsStartDateOpen(false)
                }}
              />
            </div>
          </div>
        </div>

        {/* Facility Button */}
        <div className="flex space-x-4 mb-4">
          <MetricButton
            label="Room"
            value={24}
            total={100}
            icon="room"
            isActive={activeButton === 'room'}
            onClick={() => setActiveButton('room')}
          />
          <MetricButton
            label="Vehicle"
            value={24}
            total={100}
            icon="vehicle"
            isActive={activeButton === 'vehicle'}
            onClick={() => setActiveButton('vehicle')}
          />
          <MetricButton
            label="Manpower"
            value={24}
            total={100}
            icon="manpower"
            isActive={activeButton === 'manpower'}
            onClick={() => setActiveButton('manpower')}
          />
          <MetricButton
            label="Asset"
            value={24}
            total={100}
            icon="asset"
            isActive={activeButton === 'asset'}
            onClick={() => setActiveButton('asset')}
          />
        </div>

        {/* Dashboard Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard
            roomType="Meeting Room"
            booked={8}
            total={24}
            stockAvailable={16}
            numbering={1}
            floors={dataRoom?.floor_stock}
          />
          <DashboardCard
            roomType="Pods"
            booked={8}
            total={13}
            stockAvailable={5}
            numbering={2}
            floors={[
              { name: 'Lantai 1', available: '1/6' },
              { name: 'Lantai 2', available: '1/2' },
              { name: 'Lantai 3', available: '1/2' },
            ]}
          />
          <DashboardCard
            roomType="Ballroom"
            booked={1}
            total={1}
            stockAvailable={5}
            numbering={3}
            floors={[
              { name: 'Lantai 1', available: '1/6' },
              { name: 'Lantai 2', available: '1/2' },
              { name: 'Lantai 3', available: '1/2' },
            ]}
          />
          <DashboardCard
            roomType="Karaoke"
            booked={1}
            total={1}
            stockAvailable={5}
            numbering={4}
            floors={[
              { name: 'Lantai 1', available: '1/6' },
              { name: 'Lantai 2', available: '1/2' },
              { name: 'Lantai 3', available: '1/2' },
            ]}
          />
        </div>
      </div>
    </div>
  )
}
