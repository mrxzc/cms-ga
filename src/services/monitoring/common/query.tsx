import { ISearchParams } from '@interfaces/api'
import { MonitoringStatusClassEnum } from '@interfaces/monitoringEnum'
import { useQuery } from '@tanstack/react-query'

// Get List Monitoring Status
export const useGetListMonitoringStatus = (params: ISearchParams) => {
  const monitoringStatus = new MonitoringStatusClassEnum()

  return useQuery({
    queryKey: ['/list/monitoring/status', params],
    queryFn: async () => {
      return new Promise(function (resolve) {
        setTimeout(() => {
          // reject(new Error('failed fetch'))
          resolve(params?.search ? monitoringStatus.search(params?.search) : monitoringStatus.enums)
        }, 100)
      })
    },
  })
}
