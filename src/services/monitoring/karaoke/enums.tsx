import { EnumClass } from '@interfaces/enums'

export enum KaraokeMonitoringStatus {
  REQUEST = 'REQUEST',
  PENDING = 'PENDING',
  RESCHEDULE = 'RESCHEDULE',
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  CANCELED = 'CANCELED',
}

export class KaraokeMonitoringStatusClassEnum {
  public enums: EnumClass<KaraokeMonitoringStatus>[] = [
    {
      id: KaraokeMonitoringStatus.REQUEST,
      text: 'Menunggu Approval',
      desc: 'lorem ipsum',
      badgeColor: 'bg-[#FDF4E2] text-[#F19D38]',
    },
    {
      id: KaraokeMonitoringStatus.PENDING,
      text: 'Sedang diproses',
      desc: 'lorem ipsum',
      badgeColor: 'bg-[#FDF4E2] text-[#F19D38]',
    },
    {
      id: KaraokeMonitoringStatus.RESCHEDULE,
      text: 'Reschedule',
      desc: 'lorem ipsum',
      badgeColor: 'bg-[#FDF4E2] text-[#F19D38]',
    },
    {
      id: KaraokeMonitoringStatus.APPROVE,
      text: 'Berhasil',
      desc: 'lorem ipsum',
      badgeColor: 'bg-[#D3FED7] text-[#4EC558]',
    },
    {
      id: KaraokeMonitoringStatus.REJECT,
      text: 'Ditolak',
      desc: 'lorem ipsum',
      badgeColor: 'bg-[#FCEBEE] text-[#FF4040]',
    },
    {
      id: KaraokeMonitoringStatus.CANCELED,
      text: 'Tidak Berhasil',
      desc: 'lorem ipsum',
      badgeColor: 'bg-[#FCEBEE] text-[#FF4040]',
    },
  ]

  public find(key: KaraokeMonitoringStatus | string): EnumClass<KaraokeMonitoringStatus> | undefined {
    return this.enums.find(val => val.id === key) || undefined
  }

  public search(searchVal: string = ''): EnumClass<KaraokeMonitoringStatus>[] | undefined {
    return (
      this.enums.filter(
        val =>
          val?.text?.toLowerCase()?.includes(searchVal?.toLowerCase()) ||
          val?.id?.toLowerCase()?.includes(searchVal?.toLowerCase())
      ) || undefined
    )
  }
}
