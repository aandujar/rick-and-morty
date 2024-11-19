import { ref } from 'vue'
import { defineStore } from 'pinia'

import CharactersService from '@/services/charactersService'
import { Character } from '@/classes/Character'
import type { CharacterFilter } from '@/classes/CharacterFilter'
import type { InfoApi } from '@/classes/InfoApi'
import { CharacterLocation } from '@/classes/CharacterLocation'
import type { APIResponseElement, APIResponseList } from '@/classes/ApiResponse'

export const useCharacterStore = defineStore('character', () => {
  const loading = ref<boolean>(false)
  const characters = ref<Character[]>([])
  let characterDetail = ref<Character>({} as Character)

  function setCharacters(charactersList: Character[]): void {
    characters.value = [...charactersList]
  }

  function setCharacter(character: Character): void {
    if (character?.id) {
      characterDetail.value = new Character(
        character.id,
        character.name,
        character.status,
        character.species,
        character.type,
        character.gender,
        character.image,
        character.origin
          ? new CharacterLocation(character.origin.name, character.origin.url)
          : undefined,
        character.location
          ? new CharacterLocation(
              character.location.name,
              character.location.url,
            )
          : undefined,
        character.created,
        character.episode,
      )
    } else {
      characterDetail.value = {} as Character
    }
  }

  async function getCharacters(pagination: CharacterFilter): Promise<InfoApi> {
    return new Promise((resolve, reject) => {
      CharactersService.getAll(pagination)
        .then((response: APIResponseList<Character[]>) => {
          setCharacters(response.status === 200 ? response.data.results : [])
          resolve(response.data.info)
        })
        .catch((e: Error) => {
          setCharacters([])
          reject(e)
        })
    })
  }

  async function getCharacterById(characterId: number): Promise<Character> {
    return new Promise((resolve, reject) => {
      CharactersService.getById(characterId)
        .then((response: APIResponseElement<Character>) => {
          setCharacter(
            response.status === 200 ? response.data : ({} as Character),
          )
          resolve(response.data)
        })
        .catch((e: Error) => {
          setCharacters([])
          reject(e)
        })
    })
  }

  return {
    characters,
    loading,
    characterDetail,
    getCharacters,
    setCharacters,
    getCharacterById,
    setCharacter,
  }
})
