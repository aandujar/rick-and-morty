import { ref } from 'vue'
import { defineStore } from 'pinia'

import CharactersService from '@/services/charactersService'
import type { APIResponse } from '@/classes/ApiResponse'
import type { Character } from '@/classes/Character'
import type { CharacterFilter } from '@/classes/CharacterFilter'
import type { InfoApi } from '@/classes/InfoApi'

export const useCharacterStore = defineStore('character', () => {
  const loading = ref<boolean>(false)
  const characters = ref<Character[]>([])
  function setCharacters(charactersList: Character[]) {
    characters.value = [...charactersList]
  }
  async function getCharacters(pagination: CharacterFilter): Promise<InfoApi> {
    return new Promise((resolve, reject) => {
      CharactersService.getAll(pagination)
        .then((response: APIResponse<Character[]>) => {
          setCharacters(response.status === 200 ? response.data.results : [])
          resolve(response.data.info)
        })
        .catch((e: Error) => {
          setCharacters([])
          reject(e)
        })
    })
  }

  return { characters, loading, getCharacters }
})
