import React, { ReactNode } from 'react'

interface ColumnInterface {
  title: string
  key: string
  filterComponent?: ReactNode
  render?: (data: any) => ReactNode
  className?: string
}

interface TableProps {
  columns: ColumnInterface[]
  data: any[]
}

export const DynamicTable = ({ columns, data }: TableProps) => {
  return (
    <div className="relative mb-6 overflow-y-auto overflow-x-auto">
      <div className="rounded-lg border border-[#E6E5E6] overflow-auto">
        <table className="table-fixed custom-table">
          <thead className="table-head text-heading xs semibold-16">
            <tr>
              {columns.map(col => (
                <th key={col.key} className={col.className}>
                  <div className="text-center flex items-center justify-center space-x-2">
                    <span>{col.title}</span>
                    {col.filterComponent && (
                      <div className="flex items-center hover:cursor-pointer">{col.filterComponent}</div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="table-body text-paragraph regular-14">
            {data.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                {columns.map(col => (
                  <td key={`col-${col.key}-${rowIndex}`} className={col.className}>
                    {col.render ? col.render(row[col.key]) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
