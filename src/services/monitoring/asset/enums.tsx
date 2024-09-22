import { EnumClass } from '@interfaces/enums'

export enum AssetMonitoringStatus {
  REQUEST = 'REQUEST',
  PENDING = 'PENDING',
  RESCHEDULE = 'RESCHEDULE',
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  CANCELED = 'CANCELED',
}

export class AssetMonitoringStatusClassEnum {
  public enums: EnumClass<AssetMonitoringStatus>[] = [
    {
      id: AssetMonitoringStatus.REQUEST,
      text: 'Menunggu Approval',
      desc: 'lorem ipsum',
      badgeColor: 'bg-[#FDF4E2] text-[#F19D38]',
    },
    {
      id: AssetMonitoringStatus.PENDING,
      text: 'Sedang diproses',
      desc: 'lorem ipsum',
      badgeColor: 'bg-[#FDF4E2] text-[#F19D38]',
    },
    {
      id: AssetMonitoringStatus.RESCHEDULE,
      text: 'Reschedule',
      desc: 'lorem ipsum',
      badgeColor: 'bg-[#FDF4E2] text-[#F19D38]',
    },
    {
      id: AssetMonitoringStatus.APPROVE,
      text: 'Berhasil',
      desc: 'lorem ipsum',
      badgeColor: 'bg-[#D3FED7] text-[#4EC558]',
    },
    {
      id: AssetMonitoringStatus.REJECT,
      text: 'Ditolak',
      desc: 'lorem ipsum',
      badgeColor: 'bg-[#FCEBEE] text-[#FF4040]',
    },
    {
      id: AssetMonitoringStatus.CANCELED,
      text: 'Tidak Berhasil',
      desc: 'lorem ipsum',
      badgeColor: 'bg-[#FCEBEE] text-[#FF4040]',
    },
  ]

  public find(key: AssetMonitoringStatus): EnumClass<AssetMonitoringStatus> | undefined {
    return this.enums.find(val => val.id === key) || undefined
  }

  public search(searchVal: string = ''): EnumClass<AssetMonitoringStatus>[] | undefined {
    return (
      this.enums.filter(
        val =>
          val?.text?.toLowerCase()?.includes(searchVal?.toLowerCase()) ||
          val?.id?.toLowerCase()?.includes(searchVal?.toLowerCase())
      ) || undefined
    )
  }
}
