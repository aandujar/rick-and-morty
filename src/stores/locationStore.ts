import { ref } from 'vue'
import { defineStore } from 'pinia'
import LocationService from '@/services/locationService'
import { Location } from '@/classes/Location'
import { LocationFilter } from '@/classes/LocationFilter'
import { InfoApi } from '@/classes/InfoApi'
import type { APIResponse, APIResponseList } from '@/classes/ApiResponse'

export const useLocationStore = defineStore('location', () => {
  const loading = ref<boolean>(false)
  const locations = ref<Location[]>([])
  let locationDetail = ref<Location>({} as Location)

  function setLocations(locationList: Location[]): void {
    locations.value = [...locationList]
  }

  function setLocation(location: Location): void {
    if (location?.id) {
      locationDetail.value = new Location(
        location.id,
        location.name,
        location.type,
        location.dimension,
        location.residents,
      )
    } else {
      locationDetail.value = {} as Location
    }
  }

  async function getLocations(pagination: LocationFilter): Promise<InfoApi> {
    return new Promise((resolve, reject) => {
      LocationService.getAll(pagination)
        .then((response: APIResponseList<Location[]>) => {
          setLocations(response.status === 200 ? response.data.results : [])
          resolve(response.data.info)
        })
        .catch((e: Error) => {
          setLocations([])
          reject(e)
        })
    })
  }

  async function getLocationById(locationId: number): Promise<Location> {
    return new Promise((resolve, reject) => {
      LocationService.getById(locationId)
        .then((response: APIResponse<Location>) => {
          setLocation(
            response.status === 200 ? response.data : ({} as Location),
          )
          resolve(response.data)
        })
        .catch((e: Error) => {
          setLocation({} as Location)
          reject(e)
        })
    })
  }

  return {
    locations,
    loading,
    locationDetail,
    getLocations,
    setLocations,
    getLocationById,
    setLocation,
  }
})
