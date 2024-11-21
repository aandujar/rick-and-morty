import { ref } from 'vue'
import { defineStore } from 'pinia'

import EpisodeService from '@/services/episodeService'
import { Episode } from '@/classes/Episode'
import { EpisodeFilter } from '@/classes/EpisodeFilter'
import { InfoApi } from '@/classes/InfoApi'
import type { APIResponse, APIResponseList } from '@/classes/ApiResponse'

export const useEpisodeStore = defineStore('episode', () => {
  const loading = ref<boolean>(false)
  const episodes = ref<Episode[]>([])
  const episodesDetail = ref<Episode[]>([])
  let episodeDetail = ref<Episode>({} as Episode)

  function setEpisodes(episodeList: Episode[]): void {
    episodes.value = [...episodeList]
  }

  function setEpisodesDetail(episodesList: Episode[]): void {
    episodesDetail.value = [...episodesList]
  }

  function setEpisode(episode: Episode): void {
    if (episode?.id) {
      episodeDetail.value = new Episode(
        episode.id,
        episode.name,
        episode.air_date,
        episode.episode,
        episode.characters,
      )
    } else {
      episodeDetail.value = {} as Episode
    }
  }

  async function getEpisodes(pagination: EpisodeFilter): Promise<InfoApi> {
    return new Promise((resolve, reject) => {
      EpisodeService.getAll(pagination)
        .then((response: APIResponseList<Episode[]>) => {
          setEpisodes(response.status === 200 ? response.data.results : [])
          resolve(response.data.info)
        })
        .catch((e: Error) => {
          setEpisodes([])
          reject(e)
        })
    })
  }

  async function getEpisodeById(episodeId: number): Promise<Episode> {
    return new Promise((resolve, reject) => {
      EpisodeService.getById(episodeId)
        .then((response: APIResponse<Episode>) => {
          setEpisode(response.status === 200 ? response.data : ({} as Episode))
          resolve(response.data)
        })
        .catch((e: Error) => {
          setEpisode({} as Episode)
          reject(e)
        })
    })
  }

  async function getEpisodeByIdForDetail(episodeId: number): Promise<Episode> {
    return new Promise((resolve, reject) => {
      EpisodeService.getById(episodeId)
        .then((response: APIResponse<Episode>) => {
          if (response.status === 200) {
            const episodessList: Episode[] = []
            episodessList.push(response.data)
            setEpisodesDetail(episodessList)
          } else {
            setEpisodesDetail([])
          }
          resolve(response.data)
        })
        .catch((e: Error) => {
          setEpisode({} as Episode)
          reject(e)
        })
    })
  }

  async function getEpisodesById(episodesId: string): Promise<Episode[]> {
    return new Promise((resolve, reject) => {
      EpisodeService.getAllById(episodesId)
        .then((response: APIResponse<Episode[]>) => {
          setEpisodesDetail(response.status === 200 ? response.data : [])
          resolve(response.data)
        })
        .catch((e: Error) => {
          setEpisodesDetail([])
          reject(e)
        })
    })
  }

  return {
    episodes,
    loading,
    episodeDetail,
    episodesDetail,
    getEpisodes,
    setEpisodes,
    getEpisodeById,
    setEpisode,
    setEpisodesDetail,
    getEpisodesById,
    getEpisodeByIdForDetail,
  }
})
