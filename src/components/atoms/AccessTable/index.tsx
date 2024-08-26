import React from 'react'

interface AccessTableProps {
  accessState: {
    menu: string
    create: boolean
    update: boolean
    delete: boolean
    view: boolean
    all: boolean
  }[]
  onAccessChange?: (updatedAccessData: AccessTableProps['accessState']) => void
}

const AccessTable: React.FC<AccessTableProps> = ({ accessState, onAccessChange }) => {
  const handleCheckboxChange = (menu: string, accessType: 'create' | 'update' | 'delete' | 'view' | 'all') => {
    onAccessChange?.(
      accessState.map(item => (item.menu === menu ? { ...item, [accessType]: !item[accessType] } : item))
    )
  }

  return (
    <table className="w-full border-collapse rounded-3xl">
      <thead>
        <tr className="bg-[#f5f5f5]">
          <th className="p-2 border">Menu</th>
          <th className="p-2 border">Create</th>
          <th className="p-2 border">Update</th>
          <th className="p-2 border">Delete</th>
          <th className="p-2 border">View</th>
          <th className="p-2 border">All</th>
        </tr>
      </thead>
      <tbody>
        {accessState.map(item => (
          <tr key={item.menu}>
            <td className="p-2 border">{item.menu}</td>
            <td className="p-2 border text-center">
              <input
                type="checkbox"
                defaultChecked={item.create}
                onChange={() => handleCheckboxChange(item.menu, 'create')}
              />
            </td>
            <td className="p-2 border text-center">
              <input
                type="checkbox"
                defaultChecked={item.update}
                onChange={() => handleCheckboxChange(item.menu, 'update')}
              />
            </td>
            <td className="p-2 border text-center">
              <input
                type="checkbox"
                defaultChecked={item.delete}
                onChange={() => handleCheckboxChange(item.menu, 'delete')}
              />
            </td>
            <td className="p-2 border text-center">
              <input
                type="checkbox"
                defaultChecked={item.view}
                onChange={() => handleCheckboxChange(item.menu, 'view')}
              />
            </td>
            <td className="p-2 border text-center">
              <input
                type="checkbox"
                defaultChecked={item.all}
                onChange={() => handleCheckboxChange(item.menu, 'all')}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default AccessTable
