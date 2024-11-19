import type { InfoApi } from '@/classes/InfoApi'

export type APIResponse<T> = {
  data: {
    info: InfoApi
    results: T
  }
  status: number
}
