import { EnumClass } from '@interfaces/enums'

export enum MeetingRoomMonitoringStatus {
  REQUEST = 'REQUEST',
  PENDING = 'PENDING',
  RESCHEDULE = 'RESCHEDULE',
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  CANCELED = 'CANCELED',
}

export class MeetingRoomMonitoringStatusClassEnum {
  public enums: EnumClass<MeetingRoomMonitoringStatus>[] = [
    {
      id: MeetingRoomMonitoringStatus.REQUEST,
      text: 'Menunggu Approval',
      desc: 'lorem ipsum',
      badgeColor: 'bg-[#FDF4E2] text-[#F19D38]',
    },
    {
      id: MeetingRoomMonitoringStatus.PENDING,
      text: 'Sedang diproses',
      desc: 'lorem ipsum',
      badgeColor: 'bg-[#FDF4E2] text-[#F19D38]',
    },
    {
      id: MeetingRoomMonitoringStatus.RESCHEDULE,
      text: 'Reschedule',
      desc: 'lorem ipsum',
      badgeColor: 'bg-[#FDF4E2] text-[#F19D38]',
    },
    {
      id: MeetingRoomMonitoringStatus.APPROVE,
      text: 'Berhasil',
      desc: 'lorem ipsum',
      badgeColor: 'bg-[#D3FED7] text-[#4EC558]',
    },
    {
      id: MeetingRoomMonitoringStatus.REJECT,
      text: 'Ditolak',
      desc: 'lorem ipsum',
      badgeColor: 'bg-[#FCEBEE] text-[#FF4040]',
    },
    {
      id: MeetingRoomMonitoringStatus.CANCELED,
      text: 'Tidak Berhasil',
      desc: 'lorem ipsum',
      badgeColor: 'bg-[#FCEBEE] text-[#FF4040]',
    },
  ]

  public find(key: MeetingRoomMonitoringStatus | string): EnumClass<MeetingRoomMonitoringStatus> | undefined {
    return this.enums.find(val => val.id === key) || undefined
  }

  public search(searchVal: string = ''): EnumClass<MeetingRoomMonitoringStatus>[] | undefined {
    return (
      this.enums.filter(
        val =>
          val?.text?.toLowerCase()?.includes(searchVal?.toLowerCase()) ||
          val?.id?.toLowerCase()?.includes(searchVal?.toLowerCase())
      ) || undefined
    )
  }
}
