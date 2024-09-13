'use client'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import React, { useEffect, useState } from 'react'

import MetricButton from '@components/atoms/MetricButton'
import DashboardCard from '@components/atoms/DashboardCard'
import SelectInput from '@components/atoms/Form/Select'
import { useGetLocation } from '@services/gcm/location/query'
import { IGcmLocationListParams } from '@interfaces/gcmLocation'
import { OptionItem } from '@interfaces/utils'

export function Dashboard() {
  const defaultParams = {
    search: '',
    page: 1,
    size: 10,
  }

  const [activeButton, setActiveButton] = useState('room')
  const [optionsLocation, setOptionsLocation] = useState<OptionItem[]>([])
  const [params] = useState<IGcmLocationListParams>(defaultParams)
  const [selectedOption, setSelectedOption] = useState(null)

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
    <div className="px-4 py-8 bg-[#f6f6f6] h-screen w-full overflow-y-auto !important">
      <div className="bg-white px-4 py-4 rounded-xl mb-4 text-[#235696] flex justify-between">
        <Stack spacing={2}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </div>

      <div className="bg-white px-4 py-4 rounded-xl h-full">
        <p className="text-heading s semibold-18 mb-4">Stock Booking Asset</p>
        {/* Filter Location and Date */}
        <div className="flex gap-4 mb-4">
          <div className="min-w-[230px]">
            <p>Lokasi</p>
            <SelectInput
              name="mySelect"
              options={optionsLocation}
              value={selectedOption}
              onChange={handleChange}
              isValid={true}
              isInvalid={false}
            />
          </div>
          <div>
            <p>Tanggal</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard
            roomType="Meeting Room"
            booked={8}
            total={24}
            stockAvailable={16}
            numbering={1}
            floors={[
              { name: 'Lantai 1', available: '1/2' },
              { name: 'Lantai 2', available: '1/2' },
              // ... add more floors as needed
            ]}
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
            booked={8}
            total={13}
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
            booked={8}
            total={13}
            stockAvailable={5}
            numbering={4}
            floors={[
              { name: 'Lantai 1', available: '1/6' },
              { name: 'Lantai 2', available: '1/2' },
              { name: 'Lantai 3', available: '1/2' },
            ]}
          />
          {/* Add Ballroom and Karaoke components similarly */}
        </div>
      </div>
    </div>
  )
}
