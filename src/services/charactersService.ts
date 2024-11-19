import type { APIResponse } from '@/classes/ApiResponse'
import http from '@/http-common'

class CharactersService {
  getAll(pagination: CharacterFilter): Promise<APIResponse<Character[]>> {
    return http.get('/character', { params: pagination })
  }
}

export default new CharactersService()
