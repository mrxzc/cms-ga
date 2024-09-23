import IconAsset from '@assets/icons/IconAsset'
import IconManpower from '@assets/icons/IconManpower'
import IconRoom from '@assets/icons/IconRoom'
import IconVehicle from '@assets/icons/IconVehicle'
import React from 'react'

const MetricButton = ({ label, value, total, icon, isActive, onClick }: any) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'room':
        return <IconRoom />
      case 'vehicle':
        return <IconVehicle />
      case 'manpower':
        return <IconManpower />
      case 'asset':
        return <IconAsset />
      default:
        return null
    }
  }

  return (
    <div
      className={`flex items-center p-3 bg-white rounded-lg shadow-md border w-full hover:cursor-pointer ${
        isActive ? 'border-blue-500' : 'border-gray-200'
      }`}
      onClick={onClick}
      onKeyDown={() => {}}
    >
      <div className="flex-grow">
        <div className="text-sm font-medium text-gray-500">{label}</div>
        <div className="text-lg font-semibold">
          {value}
          <span className="text-gray-400">/{total}</span>
        </div>
      </div>
      <div className="ml-4 p-2 rounded-full">{getIcon(icon)}</div>
    </div>
  )
}

export default MetricButton
