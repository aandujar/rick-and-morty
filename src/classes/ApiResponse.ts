import type { InfoApi } from '@/classes/InfoApi'

export type APIResponse<T> = {
  data: T
  status: number
}

export type APIResponseList<T> = {
  data: {
    info: InfoApi
    results: T
  }
  status: number
}
