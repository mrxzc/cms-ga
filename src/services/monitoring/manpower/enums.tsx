import { EnumClass } from '@interfaces/enums'

export enum ManpowerCategory {
  CLEANING_SERVICE = 'CLEANING_SERVICE',
  MAINTENANCE = 'MAINTENANCE',
  SECURITY = 'SECURITY',
  RECEPTIONIST = 'RECEPTIONIST',
}

export class ManpowerCategoryClassEnum {
  public enums: EnumClass<ManpowerCategory>[] = [
    {
      id: ManpowerCategory.CLEANING_SERVICE,
      text: 'Cleaning Service',
      desc: 'lorem ipsum',
    },
    {
      id: ManpowerCategory.MAINTENANCE,
      text: 'Maintenance',
      desc: 'lorem ipsum',
    },
    {
      id: ManpowerCategory.SECURITY,
      text: 'Security',
      desc: 'lorem ipsum',
    },
    {
      id: ManpowerCategory.RECEPTIONIST,
      text: 'Receptionist',
      desc: 'lorem ipsum',
    },
  ]

  public find(key: ManpowerCategory | string): EnumClass<ManpowerCategory> | undefined {
    return this.enums.find(val => val.id === key) || undefined
  }

  public search(searchVal: string = ''): EnumClass<ManpowerCategory>[] | undefined {
    return (
      this.enums.filter(
        val =>
          val?.text?.toLowerCase()?.includes(searchVal?.toLowerCase()) ||
          val?.id?.toLowerCase()?.includes(searchVal?.toLowerCase())
      ) || undefined
    )
  }
}

export enum ManpowerMonitoringStatus {
  REQUEST = 'REQUEST',
  PENDING = 'PENDING',
  RESCHEDULE = 'RESCHEDULE',
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  CANCELED = 'CANCELED',
}

export class ManpowerMonitoringStatusClassEnum {
  public enums: EnumClass<ManpowerMonitoringStatus>[] = [
    {
      id: ManpowerMonitoringStatus.REQUEST,
      text: 'Menunggu Approval',
      desc: 'lorem ipsum',
      badgeColor: 'bg-[#FDF4E2] text-[#F19D38]',
    },
    {
      id: ManpowerMonitoringStatus.PENDING,
      text: 'Sedang diproses',
      desc: 'lorem ipsum',
      badgeColor: 'bg-[#FDF4E2] text-[#F19D38]',
    },
    {
      id: ManpowerMonitoringStatus.RESCHEDULE,
      text: 'Reschedule',
      desc: 'lorem ipsum',
      badgeColor: 'bg-[#FDF4E2] text-[#F19D38]',
    },
    {
      id: ManpowerMonitoringStatus.APPROVE,
      text: 'Berhasil',
      desc: 'lorem ipsum',
      badgeColor: 'bg-[#D3FED7] text-[#4EC558]',
    },
    {
      id: ManpowerMonitoringStatus.REJECT,
      text: 'Ditolak',
      desc: 'lorem ipsum',
      badgeColor: 'bg-[#FCEBEE] text-[#FF4040]',
    },
    {
      id: ManpowerMonitoringStatus.CANCELED,
      text: 'Tidak Berhasil',
      desc: 'lorem ipsum',
      badgeColor: 'bg-[#FCEBEE] text-[#FF4040]',
    },
  ]

  public find(key: ManpowerMonitoringStatus | string): EnumClass<ManpowerMonitoringStatus> | undefined {
    return this.enums.find(val => val.id === key) || undefined
  }

  public search(searchVal: string = ''): EnumClass<ManpowerMonitoringStatus>[] | undefined {
    return (
      this.enums.filter(
        val =>
          val?.text?.toLowerCase()?.includes(searchVal?.toLowerCase()) ||
          val?.id?.toLowerCase()?.includes(searchVal?.toLowerCase())
      ) || undefined
    )
  }
}
