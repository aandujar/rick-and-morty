import type { APIResponseList, APIResponse } from '@/classes/ApiResponse'
import type { Location } from '@/classes/Location'
import type { LocationFilter } from '@/classes/LocationFilter'
import http from '@/http-common'

class LocationService {
  getAll(pagination: LocationFilter): Promise<APIResponseList<Location[]>> {
    return http.get('/location', { params: pagination })
  }

  getById(locationId: number): Promise<APIResponse<Location>> {
    return http.get(`/location/${locationId}`)
  }
}

export default new LocationService()
