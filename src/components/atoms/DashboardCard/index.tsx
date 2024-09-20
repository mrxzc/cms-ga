import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const DashboardCard = ({ roomType, booked, total, stockAvailable, floors, numbering, ...props }: any) => {
  const [floorStates, setFloorStates] = useState(floors.map(() => false))

  const percentage = (booked / total) * 100
  const strokeWidth = 20
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const arc = circumference * (180 / 360) // Half circle
  const dashArray = `${arc} ${circumference}`
  const dashOffset = arc - (Math.min(percentage, 100) / 100) * arc // Ensure it doesn't go beyond 100%

  const getBackgroundClass = (numbering: number) => {
    switch (numbering) {
      case 1:
        return '#4285DE'
      case 2:
        return '#8CB0FA'
      case 3:
        return '#EF86AA'
      case 4:
        return '#C595D4'
      default:
        return '#FFB7B7'
    }
  }

  const handleStatus = (status: string) => {
    if (status === 'Available') {
      return (
        <p className="text-green-500 bg-[#b0ffcd] border border-[#22c55e] rounded-md min-w-[65px] text-center">
          {status}
        </p>
      )
    } else {
      return (
        <p className="text-red-500 bg-[#ffbebe] border border-[#ef4444] rounded-md min-w-[65px] text-center">
          {status}
        </p>
      )
    }
  }

  const toggleFloor = (index: number) => {
    setFloorStates((prevStates: any) => {
      const newStates = [...prevStates]
      newStates[index] = !newStates[index]
      return newStates
    })
  }

  return (
    <div className="h-full overflow-y-auto" {...props}>
      <h2 className="text-xl font-bold mb-4 text-center">{roomType}</h2>

      <div className="relative flex flex-col items-center">
        <svg width="200" height="120" viewBox="0 0 200 120">
          <path
            d="M10 110 A90 90 0 0 1 190 110"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <path
            d="M10 110 A90 90 0 0 1 190 110"
            fill="none"
            stroke={`${getBackgroundClass(numbering)}`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            className="transition-all duration-500 ease-in-out"
          />
        </svg>

        <div className="absolute bottom-0 left-0 right-0 text-center mb-2 flex flex-col items-center ">
          <p className="text-ultra-small regular-10 text-[#717171]">Booked</p>
          <p className={`text-paragraph semibold-14 text-[#0089CF]`}>
            {booked} / {total}
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md h-full">
        <div className="flex flex-col items-center mb-4">
          <p className="text-sm mb-1">Stock:</p>
          <p className="text-paragraph semibold-14 text-blue-600">{stockAvailable} Available</p>
        </div>

        <div className="space-y-2 overflow-y-auto hide-scrollbar" style={{ scrollbarWidth: 'thin' }}>
          {floors.map((floor: any, index: any) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="flex items-center justify-between w-full"
                onClick={() => toggleFloor(index)}
                onKeyDown={() => {}}
              >
                <div className="flex flex-col">
                  <p className="text-sm">{floor.floor_name}</p>
                  <p className="text-xs text-gray-500">Available: {floor.available_rooms}</p>
                </div>
                {floorStates[index] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
              {floorStates[index] && floor.rooms && (
                <div className="w-full gap-1 flex flex-col mt-1">
                  {floor.rooms.map((room: any) => (
                    <div key={room.room_name} className="flex items-center justify-between">
                      <p
                        className={`${
                          room.status === 'Available' ? 'text-[black]' : 'text-[#b1b1b1]'
                        } text-paragraph regular-14`}
                      >
                        {room.room_name}
                      </p>
                      <p className="text-extra-small regular-12">{handleStatus(room.status)}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="divider w-full my-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardCard
