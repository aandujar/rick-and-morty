import type { APIResponseList, APIResponse } from '@/classes/ApiResponse'
import type { Episode } from '@/classes/Episode'
import type { EpisodeFilter } from '@/classes/EpisodeFilter'
import http from '@/http-common'

class EpisodeService {
  getAll(pagination: EpisodeFilter): Promise<APIResponseList<Episode[]>> {
    return http.get('/episode', { params: pagination })
  }

  getById(episodeId: number): Promise<APIResponse<Episode>> {
    return http.get(`/episode/${episodeId}`)
  }
}

export default new EpisodeService()
