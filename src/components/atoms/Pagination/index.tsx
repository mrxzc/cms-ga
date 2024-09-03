'use client'

import { IPaginations } from '@interfaces/api'

interface PaginationProps {
  showMiddlePage?: number
  isLoading?: boolean
  pagination: IPaginations | undefined
  clicked?: (page: number) => void
}

export const handleMapPagination = (pagination: IPaginations) => {
  if (!pagination) return ''
  return `${
    pagination?.currentPage * (pagination?.totalRecords / pagination?.totalPage) -
    (pagination?.totalRecords / pagination?.totalPage - 1)
  }
  - ${pagination?.currentPage * (pagination?.totalRecords / pagination?.totalPage)} of
  ${pagination?.totalRecords}`
}

export default function Pagination({
  isLoading,
  showMiddlePage = 5,
  pagination,
  clicked = () => {},
}: Readonly<PaginationProps>) {
  const getPages = () => {
    let arr = []

    if (!pagination?.totalRecords) return []

    for (let index = 1; index <= pagination.totalPage; index++) {
      arr.push(index)
    }

    if (pagination.currentPage + showMiddlePage <= pagination.totalPage) {
      arr = arr.slice(pagination.currentPage - 1, pagination.currentPage + showMiddlePage - 1)
    }

    if (pagination.currentPage + showMiddlePage > pagination.totalPage) {
      arr = arr.slice(-showMiddlePage)
    }

    return arr
  }

  const handlePageClicked = (page: number) => {
    clicked(page)
  }

  return (
    <>
      {isLoading && (
        <div className="flex items-center sm:items-start flex-col sm:flex-row space-y-4 sm:space-y-0">
          <div className="animate-pulse flex-1">
            <div className="bg-gray-200 h-6 w-40 "></div>
          </div>
          <div className="flex items-center space-x-3 animate-pulse">
            <div className="w-16 h-6 bg-gray-200"></div>
            <div className="w-6 h-6 bg-gray-200"></div>
            <div className="w-6 h-6 bg-gray-200"></div>
            <div className="w-6 h-6 bg-gray-200"></div>
            <div className="w-16 h-6 bg-gray-200"></div>
          </div>
        </div>
      )}
      {!isLoading && pagination?.totalRecords ? (
        <div className="flex items-center sm:items-start flex-col sm:flex-row space-y-4 sm:space-y-0">
          <div className="text-paragraph regular-14 text-[#0C0C0C] flex-1">
            Showing {handleMapPagination(pagination)}
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handlePageClicked(pagination?.currentPage - 1)}
              disabled={pagination?.currentPage === 1}
              type="button"
              className={`text-paragraph regular-14 ${
                pagination?.currentPage === 1 ? 'text-[#D5D5D5]' : 'text-[#OCOCOC]'
              }`}
            >
              Previous
            </button>

            <button
              onClick={() => handlePageClicked(1)}
              disabled={pagination?.currentPage === 1}
              type="button"
              className={`rounded w-[31px] h-[26px] text-paragraph regular-14 ${
                pagination?.currentPage === 1 ? 'bg-[#0089CF] text-[#FFFFFF]' : 'text-[#000000]'
              }`}
            >
              1
            </button>

            {pagination.currentPage > 2 && pagination.totalPage > showMiddlePage + 1 && (
              <button
                onClick={() => handlePageClicked(2)}
                type="button"
                className={`rounded w-[31px] h-[26px] text-paragraph regular-14 text-[#000000]`}
              >
                {'....'}
              </button>
            )}

            {getPages().map((page: number) => {
              if (page !== 1 && page !== pagination.totalPage) {
                return (
                  <button
                    disabled={pagination?.currentPage === page}
                    onClick={() => handlePageClicked(page)}
                    key={`pagination-${page}`}
                    type="button"
                    className={`rounded w-[31px] h-[26px] text-paragraph regular-14 ${
                      pagination?.currentPage === page ? 'bg-[#0089CF] text-[#FFFFFF]' : 'text-[#000000]'
                    }`}
                  >
                    {page}
                  </button>
                )
              }

              return null
            })}

            {pagination.currentPage + showMiddlePage + 1 <= pagination.totalPage &&
              !(pagination.totalPage <= showMiddlePage) && (
                <button
                  onClick={() => handlePageClicked(pagination.totalPage - 1)}
                  type="button"
                  className={`rounded w-[31px] h-[26px] text-paragraph regular-14 text-[#000000]`}
                >
                  {'....'}
                </button>
              )}

            {pagination.totalPage !== 1 && (
              <button
                disabled={pagination?.currentPage === pagination.totalPage}
                onClick={() => handlePageClicked(pagination.totalPage)}
                type="button"
                className={`rounded w-[31px] h-[26px] text-paragraph regular-14 ${
                  pagination?.currentPage === pagination.totalPage ? 'bg-[#0089CF] text-[#FFFFFF]' : 'text-[#000000]'
                }`}
              >
                {pagination.totalPage}
              </button>
            )}

            <button
              onClick={() => handlePageClicked(pagination?.currentPage + 1)}
              disabled={pagination?.currentPage === pagination?.totalPage}
              type="button"
              className={`ml-2 text-paragraph regular-14 ${
                pagination?.currentPage === pagination?.totalPage ? 'text-[#D5D5D5]' : 'text-[#OCOCOC]'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}
