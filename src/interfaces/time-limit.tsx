export interface ITimeLimit {
  id: number
  category: string
  duration: Duration
  slaForm: SLAForm | null
  createdDate: string
  updatedDate: string
}

interface Duration {
  id: number
  days: number
  hours: number
  minutes: number
  timeLimitId: TimeLimitId
}

interface SLAForm {
  id: number
  days: number
  hours: number
  minutes: number
  timeLimitId: TimeLimitId
}

interface TimeLimitId {
  timeLimitId: number
  category: string
  createdDate: string
  updatedDate: string
}
