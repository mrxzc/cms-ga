import { EnumClass } from './enums'

export enum AssetStatus {
  RETURN = 'RETURN',
  SUCCESS = 'SUCCESS',
  DONE = 'DONE',
  FAILED = 'FAILED',
}

export class AssetStatusClassEnum {
  public enums: EnumClass<AssetStatus>[] = [
    {
      id: AssetStatus.RETURN,
      text: 'Pengembalian',
      desc: 'lorem ipsum',
      badgeColor: 'bg-[#FDF4E2] text-[#F19D38]',
    },
    {
      id: AssetStatus.SUCCESS,
      text: 'Berhasil',
      desc: 'lorem ipsum',
      badgeColor: 'bg-[#D3FED7] text-[#4EC558]',
    },
    {
      id: AssetStatus.DONE,
      text: 'Selesai',
      desc: 'lorem ipsum',
      badgeColor: 'bg-[#D3FED7] text-[#4EC558]',
    },
    {
      id: AssetStatus.FAILED,
      text: 'Tidak Berhasil',
      desc: 'lorem ipsum',
      badgeColor: 'bg-[#FCEBEE] text-[#FF4040]',
    },
  ]

  public find(key: AssetStatus): EnumClass<AssetStatus> | undefined {
    return this.enums.find(val => val.id === key) || undefined
  }

  public search(searchVal: string = ''): EnumClass<AssetStatus>[] | undefined {
    return (
      this.enums.filter(
        val =>
          val?.text?.toLowerCase()?.includes(searchVal?.toLowerCase()) ||
          val?.id?.toLowerCase()?.includes(searchVal?.toLowerCase())
      ) || undefined
    )
  }
}
