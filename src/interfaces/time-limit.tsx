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

interface IBodyCreateTimeLimit {
  category: string
  duration: {
    days: number
    hours: number
    minutes: number
  }
  sla: {
    days: number
    hours: number
    minutes: number
  }
}

export interface IPayloadCreateTimeLimit {
  items: IBodyCreateTimeLimit[]
}

interface IBodyUpdateTimeLimit {
  timeLimitId: number
  category: string
  duration: {
    days: number
    hours: number
    minutes: number
  }
  sla?: {
    days: number
    hours: number
    minutes: number
  }
}

export interface IPayloadUpdateTimeLimit {
  items: IBodyUpdateTimeLimit[]
}

interface DataItem {
  timeLimit: string
  duration: {
    days: number
    hours: number
    minutes: number
  }
}

export interface IResponseUpdateTimeLimit {
  data: DataItem[]
}
