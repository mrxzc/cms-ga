'use client'

import { useReactTable, getCoreRowModel, flexRender, getGroupedRowModel, Column } from '@tanstack/react-table'
import { joinClass } from '@utils/common'
import _ from 'lodash'
import React, { useMemo } from 'react'
import MuiPagination from '@mui/material/Pagination'
import LoaderTable from './LoaderTable'

interface PageProps {
  TOTAL_DATA: number
  PAGE: number
  LAST_PAGE: number
}

interface Props {
  columns: any
  data?: any
  loading?: boolean
  pagination?: PageProps
  callback?: (p: any) => void
}

export default function Table({ data = [], columns, loading, pagination, callback = () => {} }: Props) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
  })

  const headerCustom: any = useMemo(() => {
    if (table.getHeaderGroups().length > 1) {
      const tempColumns: Column<unknown, unknown>[] = []
      const columns = table.getAllColumns().map(column => {
        if (column.columns.length > 0) {
          tempColumns.push(...column.columns)
          return column
        }
        return { ...column, rowSpan: 2 }
      })
      if (tempColumns.length > 0) {
        columns.push(...tempColumns)
      }

      const headers = [...table.getHeaderGroups()]

      const result = columns.map((column: any) => {
        let find = false
        let headerFind: any
        headers.forEach(header => {
          if (find) {
            return
          }
          headerFind = header.headers.find(head => head.column.id === column.id)
          if (headerFind) {
            find = true
          }
        })

        return { ...headerFind, rowSpan: column?.rowSpan ?? headerFind?.rowSpan }
      })

      const group = _.groupBy(result, 'depth')

      return Object.keys(group).map((key, i) => ({ id: String(i), depth: i, headers: group[key] }))
    }
    return table.getHeaderGroups()
  }, [table.getHeaderGroups()])

  return (
    <div className={joinClass('overflow-y-inherit overflow-x-auto relative', loading ? 'min-h-[500px]' : '')}>
      {loading && <LoaderTable position="absolute" text="Loading..." loading />}
      <table className={joinClass('table w-full overflow-inherit border rounded-xl')}>
        <thead>
          {headerCustom.map((headerGroup: any) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => {
                return (
                  <th
                    key={header.id}
                    className={joinClass('bg-[#fcfcfc] text-black text-center text-base border')}
                    colSpan={header.colSpan}
                    rowSpan={header.rowSpan || 1}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        {data?.length > 0 && (
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="text-center border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {pagination && data?.length > 0 && (
        <div className="mt-8 flex justify-end pagination">
          <MuiPagination
            variant="outlined"
            shape="rounded"
            color="primary"
            count={pagination.LAST_PAGE}
            defaultPage={pagination.PAGE}
            onChange={(_, value) => callback(value)}
            size="large"
          />
        </div>
      )}
      {(!data || data.length === 0) && !loading && (
        <div className="text-center px-8 py-40">
          <h6 className="font-semibold text-gray-500">Data tidak ditemukan</h6>
        </div>
      )}
    </div>
  )
}
