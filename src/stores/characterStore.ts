import { ref } from 'vue'
import { defineStore } from 'pinia'

import CharactersService from '@/services/charactersService'
import { Character } from '@/classes/Character'
import { CharacterFilter } from '@/classes/CharacterFilter'
import { InfoApi } from '@/classes/InfoApi'
import { CharacterLocation } from '@/classes/CharacterLocation'
import type { APIResponse, APIResponseList } from '@/classes/ApiResponse'

export const useCharacterStore = defineStore('character', () => {
  const loading = ref<boolean>(false)
  const characters = ref<Character[]>([])
  const charactersDetail = ref<Character[]>([])
  let characterDetail = ref<Character>({} as Character)

  function setCharacters(charactersList: Character[]): void {
    characters.value = [...charactersList]
  }

  function setCharactersDetail(charactersList: Character[]): void {
    charactersDetail.value = [...charactersList]
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
        .then((response: APIResponse<Character>) => {
          setCharacter(
            response.status === 200 ? response.data : ({} as Character),
          )
          resolve(response.data)
        })
        .catch((e: Error) => {
          setCharacter({} as Character)
          reject(e)
        })
    })
  }

  async function getCharacterByIdForDetail(
    characterId: number,
  ): Promise<Character> {
    return new Promise((resolve, reject) => {
      CharactersService.getById(characterId)
        .then((response: APIResponse<Character>) => {
          if (response.status === 200) {
            const charactersList: Character[] = []
            charactersList.push(response.data)
            setCharactersDetail(charactersList)
          } else {
            setCharactersDetail([])
          }
          resolve(response.data)
        })
        .catch((e: Error) => {
          setCharacter({} as Character)
          reject(e)
        })
    })
  }

  async function getCharactersById(charactersId: string): Promise<Character[]> {
    return new Promise((resolve, reject) => {
      CharactersService.getAllById(charactersId)
        .then((response: APIResponse<Character[]>) => {
          setCharactersDetail(response.status === 200 ? response.data : [])
          resolve(response.data)
        })
        .catch((e: Error) => {
          setCharactersDetail([])
          reject(e)
        })
    })
  }

  return {
    characters,
    loading,
    characterDetail,
    charactersDetail,
    getCharacters,
    setCharacters,
    getCharacterById,
    setCharacter,
    getCharactersById,
    setCharactersDetail,
    getCharacterByIdForDetail,
  }
})
