import React from 'react'
import { ArrowRight } from 'lucide-react'

const DashboardCard = ({ roomType, booked, total, stockAvailable, floors, numbering, ...props }: any) => {
  const percentageBooked = (booked / total) * 100

  // Fungsi untuk menentukan kelas latar belakang berdasarkan numbering
  const getBackgroundClass = (numbering: number) => {
    switch (numbering) {
      case 1:
        return 'bg-[#4285DE]'
      case 2:
        return 'bg-[#8CB0FA]'
      case 3:
        return 'bg-[#EF86AA]'
      case 4:
        return 'bg-[#C595D4]'
      default:
        return 'bg-[#FFB7B7]'
    }
  }

  return (
    <div className="h-full" {...props}>
      <h2 className="text-xl font-bold mb-4 text-center">{roomType}</h2>

      {/* Booking meter */}
      <div className="relative h-8 bg-gray-200 rounded-full mb-4">
        <div
          className={`absolute h-full rounded-full ${getBackgroundClass(numbering)}`}
          style={{ width: `${percentageBooked}%` }}
        ></div>
        {/* <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
          Booked: {booked} / {total}
        </span> */}
      </div>

      <div className="flex flex-col items-center mb-4">
        <p className="text-ultra-small regular-10 text-[#717171]">Booked</p>
        <p className="text-paragraph semibold-14 text-[#0089CF]">
          {booked} / {total}
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md h-full">
        {/* Stock availability */}
        <div className="flex flex-col items-center mb-4">
          <p className="text-sm mb-1">Stock:</p>
          <p className="text-paragraph semibold-14 text-blue-600">{stockAvailable} Available</p>
        </div>

        {/* Floor list */}
        <div className="space-y-2">
          {floors.map((floor: any, index: any) => (
            <div key={index} className="flex flex-col items-center ">
              <div className="flex  items-center justify-between w-full">
                <span className="text-sm">{floor.name}</span>
                <span className="text-xs text-gray-500">Available: {floor.available}</span>
                <ArrowRight size={16} className="text-gray-400" />
              </div>
              <div className="divider w-full my-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardCard
