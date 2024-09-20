export interface IMonitoringVehicleList {
  idBooking: number
  name: string
  lokasi: string
  jenisVehicle: string
  detailUnit: string
  brand: string
  tipe: string
  tahun: string
  tanggalPengajuan: string
  tanggalBooking: string
  status: string
}

export interface IMonitoringVehicleDetail {
  tanggalPengajuan: string
  name: string
  lokasi: string
  jenisVehicle: string
  denganDriver: string
  nomorPolisi: string
  tanggalBooking: string
  jamBooking: string
  requestKapasitas: string
  keperluan: string
  formKeluar: string
  status: string
  lokasiVehicle: string
  detailUnit: string
  kapasitas: string
  transmisi: string
  platNomor: string
  bensin: string
}
