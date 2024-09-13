'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import IconChevronRight from '@assets/icons/IconChevronRight'
import { data } from './data'
import IconDownload from '@assets/icons/IconDownload'

export function DetailApproval() {
  const [requestData, setRequestData] = useState<any>()
  const [category, setCategory] = useState<string | null>(null)

  const router = useRouter()
  const pathname = usePathname()
  const slug = pathname.split('/').pop()

  useEffect(() => {
    if (slug) {
      const matchingRequest = data.find(item => item.no.toString() === slug)
      setRequestData(matchingRequest || undefined)

      if (matchingRequest?.vehicleType) {
        setCategory('Vehicle')
      } else if (matchingRequest?.facility) {
        setCategory('Ballroom')
      } else if (matchingRequest?.manpowerCategory) {
        setCategory('Manpower')
      } else {
        setCategory(null)
      }
    }
  }, [slug])

  const handleStatus = (status: string) => {
    if (status === 'Done') {
      return (
        <div className="bg-[#eaf5e9] text-[#457b3b] border max-w-[140px] py-2 px-2  border-[#afd5ab] rounded text-paragraph semibold-14">
          Selesai
        </div>
      )
    }
    if (status === 'Waiting') {
      return (
        <div className="bg-[#FDF4E2] text-[#F19D38] border max-w-[155px] py-2 px-2  border-[#F19D38] rounded text-paragraph semibold-14">
          Menunggu Approval
        </div>
      )
    } else {
      return (
        <div className="bg-[#fcebee] text-[#b63831] border max-w-[140px] py-2 px-2  border-[#e39e9c] rounded text-paragraph semibold-14">
          Tidak Berhasil
        </div>
      )
    }
  }

  return (
    <div className="mb-[600px]">
      <div className="px-4 py-8 ">
        <div className="bg-white px-6 py-3 rounded mb-4 flex items-center space-x-2">
          <button
            type="button"
            onClick={() => {
              router.push('/management/approval-bucket')
            }}
          >
            <div className="text-extra-small regular-12 text-[#235696]">Booking Asset Data - Approval Bucket</div>
          </button>
          <IconChevronRight color={'#909090'} width={24} height={24} className="-mt-0.5" />
          <div className="text-extra-small regular-12 text-[#252525]">Approval Bucket {category} Detail</div>
        </div>

        <div className="bg-white rounded-lg mb-4 p-6 relative">
          <p className="text-heading s semibold-18 mb-10">Request {category}</p>

          <div>
            <div className="grid grid-cols-4 gap-4 mb-6 items-center">
              <p className="text-heading xs regular-16">Tanggal Pengajuan</p>
              <div className="col-span-3">
                <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                  {requestData?.submissionDate}
                </div>
              </div>
            </div>

            {category === 'Manpower' && (
              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Kategori Manpower</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    {requestData?.manpowerCategory}
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-4 gap-4 mb-6 items-center">
              <p className="text-heading xs regular-16">Nama</p>
              <div className="col-span-3">
                <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                  {requestData?.name}
                </div>
              </div>
            </div>

            {category === 'Manpower' && (
              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Gender</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    {requestData?.gender}
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-4 gap-4 mb-6 items-center">
              <p className="text-heading xs regular-16">Lokasi</p>
              <div className="col-span-3">
                <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                  {requestData?.location}
                </div>
              </div>
            </div>

            {category === 'Vehicle' && (
              <div>
                <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                  <p className="text-heading xs regular-16">Jenis Vehicle</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {requestData?.vehicleType}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                  <p className="text-heading xs regular-16">Dengan Driver</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {requestData?.driver}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                  <p className="text-heading xs regular-16">Nomor Polisi</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {requestData?.policeNumber}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-4 gap-4 mb-6 items-center">
              <p className="text-heading xs regular-16">Tanggal Booking</p>
              <div className="col-span-3">
                <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                  {requestData?.bookingDate}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-6 items-center">
              <p className="text-heading xs regular-16">Waktu Booking</p>
              <div className="col-span-3">
                <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                  {requestData?.bookingTime}
                </div>
              </div>
            </div>

            {category === 'Ballroom' ||
              (category === 'Vehicle' && (
                <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                  <p className="text-heading xs regular-16">Request Kapasitas</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {requestData?.requestCapacity}
                    </div>
                  </div>
                </div>
              ))}

            {category === 'Vehicle' && (
              <>
                <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                  <p className="text-heading xs regular-16">Keperluan</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {requestData?.reason}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                  <p className="text-heading xs regular-16">Form BAST</p>
                  <div className="col-span-3">
                    <div className="">
                      <button
                        type="button"
                        onClick={() => {}}
                        className="flex gap-2  bg-[#0089cf]  rounded-md px-4 py-2 text-[white]"
                      >
                        <IconDownload width={20} height={20} color="white" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {category === 'Ballroom' && (
              <>
                <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                  <p className="text-heading xs regular-16">Fasilitas</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[120px] p-3 rounded-md ">
                      {requestData?.facility}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                  <p className="text-heading xs regular-16">Keperluan</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {requestData?.reason}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                  <p className="text-heading xs regular-16">Deskripsi</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[120px] p-3 rounded-md ">
                      {requestData?.description}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                  <p className="text-heading xs regular-16">Submit Layout</p>
                  <div className="col-span-3">
                    {requestData?.submittedLayout ? (
                      <div className="">
                        <button
                          type="button"
                          onClick={() => {}}
                          className="flex gap-2  bg-[#0089cf]  rounded-md px-4 py-2 text-[white]"
                        >
                          <IconDownload width={20} height={20} color="white" />
                          Download
                        </button>
                      </div>
                    ) : (
                      <p className="text-heading s regular-16">No Data</p>
                    )}
                  </div>
                </div>
              </>
            )}

            {category === 'Manpower' && (
              <>
                <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                  <p className="text-heading xs regular-16">Keperluan</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {requestData?.reason}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                  <p className="text-heading xs regular-16">Kebutuhan Manpower</p>
                  <div className="col-span-3">
                    <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                      {requestData?.manpowerNeeds}
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="grid grid-cols-4 gap-4 mb-6 items-center">
              <p className="text-heading xs regular-16">Status</p>
              <div className="col-span-3">
                <div>{requestData?.status !== undefined && handleStatus(requestData?.status)}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 items-end">
            <button
              className="bg-[#d92b41] border border-[#d92b41] text-[white]  rounded-md px-12 py-3 max-w-[150px] max-h-[50px] items-center justify-center flex"
              type="button"
              onClick={() => router.push('/management/approval-bucket')}
            >
              Reject
            </button>
            {category === 'Vehicle' && (
              <button
                className="bg-[#fff] text-[#235696] border border-[#235696]    rounded-md px-12 py-3 max-w-[150px] max-h-[50px] items-center justify-center flex "
                type="button"
              >
                Menyusul
              </button>
            )}
            <button
              className="bg-[#235696] border border-[#235696] text-[#e5f2fc] rounded-md px-12 py-3 max-w-[150px] max-h-[50px] items-center justify-center flex"
              type="submit"
            >
              Approve
            </button>
          </div>
        </div>

        {/* Detail Vehicle yang dipesan */}
        {category === 'Vehicle' && (
          <div className="bg-white rounded-lg mb-4 p-6 relative">
            <p className="text-heading s semibold-18 mb-10">Detail {category} yang dipesan</p>

            <div>
              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Lokasi Vehicle</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    {requestData?.detail?.location}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Detail Unit</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    {requestData?.detail?.detailUnit}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Kapasitas Mobil</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    {requestData?.detail?.capacity}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Transmisi</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    {requestData?.detail?.transmission}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Plat Nomor</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    {requestData?.detail?.platNumber}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Bensi</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    {requestData?.detail?.fuel}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detail Ballroom yang dipesan */}
        {category === 'Ballroom' && (
          <div className="bg-white rounded-lg mb-4 p-6 relative">
            <p className="text-heading s semibold-18 mb-10">Detail {category} yang dipesan</p>

            <div>
              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Lokasi Ruangan</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    {requestData?.detail?.location}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Title Room</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    {requestData?.detail?.titleRoom}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Lantai Ruangan</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    {requestData?.detail?.floor}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Description</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[120px] p-3 rounded-md ">
                    {requestData?.detail?.description}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Terms & Condition</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[120px] p-3 rounded-md ">
                    {requestData?.detail?.terms}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Fasilitas Ruangan</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[120px] p-3 rounded-md ">
                    {requestData?.detail?.facility}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detail Manpower yang dipesan */}
        {category === 'Manpower' && (
          <div className="bg-white rounded-lg mb-4 p-6 relative">
            <p className="text-heading s semibold-18 mb-10">Detail {category} yang dipesan</p>

            <div>
              <div className="grid grid-cols-4 gap-4 mb-6 items-center">
                <p className="text-heading xs regular-16">Kebutuhan Manpower</p>
                <div className="col-span-3">
                  <div className="text-paragraph regular-14 text-[#717171] border border-[#E6E5E6] bg-[#EFF2F5] min-h-[44px] p-3 rounded-md ">
                    {requestData?.detail?.manpowerNeeds}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
