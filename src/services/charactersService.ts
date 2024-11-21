import type { APIResponseList, APIResponse } from '@/classes/ApiResponse'
import type { Character } from '@/classes/Character'
import type { CharacterFilter } from '@/classes/CharacterFilter'
import http from '@/http-common'

class CharactersService {
  getAll(pagination: CharacterFilter): Promise<APIResponseList<Character[]>> {
    return http.get('/character', { params: pagination })
  }

  getById(characterId: number): Promise<APIResponse<Character>> {
    return http.get(`/character/${characterId}`)
  }

  getAllById(charactersId: string): Promise<APIResponse<Character[]>> {
    return http.get(`/character/${charactersId}`)
  }
}

export default new CharactersService()
