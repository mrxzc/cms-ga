import React from 'react'

interface DateRangeInputProps {
  labelStart?: string
  labelEnd?: string
  startDate: Date | null // State tanggal mulai dari parent
  endDate: Date | null // State tanggal akhir dari parent
  onStartDateChange: (date: Date | null) => void // Callback untuk mengubah tanggal mulai
  onEndDateChange: (date: Date | null) => void // Callback untuk mengubah tanggal akhir
}

const DateRangeInput: React.FC<DateRangeInputProps> = ({
  labelStart = 'Start Date',
  labelEnd = 'End Date',
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = new Date(event.target.value)
    onStartDateChange(newStartDate) // Panggil callback untuk memperbarui state di parent
  }

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = new Date(event.target.value)
    onEndDateChange(newEndDate) // Panggil callback untuk memperbarui state di parent
  }

  return (
    <div className="flex">
      <div className="flex flex-col">
        {labelStart && <label htmlFor="startDate">{labelStart}</label>}
        <input
          type="date"
          id="startDate"
          value={startDate ? startDate.toISOString().split('T')[0] : ''}
          onChange={handleStartDateChange}
          className="border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <span className="mx-4 self-center">To</span>
      <div className="flex flex-col">
        {labelEnd && <label htmlFor="endDate">{labelEnd}</label>}
        <input
          type="date"
          id="endDate"
          value={endDate ? endDate.toISOString().split('T')[0] : ''}
          onChange={handleEndDateChange}
          className="border border-gray-300 rounded px-3 py-2"
        />
      </div>
    </div>
  )
}

export default DateRangeInput
