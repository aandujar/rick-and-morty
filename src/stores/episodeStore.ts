import { ref } from 'vue'
import { defineStore } from 'pinia'

import EpisodeService from '@/services/episodeService'
import { Episode } from '@/classes/Episode'
import { EpisodeFilter } from '@/classes/EpisodeFilter'
import { InfoApi } from '@/classes/InfoApi'
import type { APIResponseElement, APIResponseList } from '@/classes/ApiResponse'

export const useEpisodeStore = defineStore('episode', () => {
  const loading = ref<boolean>(false)
  const episodes = ref<Episode[]>([])
  let episodeDetail = ref<Episode>({} as Episode)

  function setEpisodes(episodeList: Episode[]): void {
    episodes.value = [...episodeList]
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
        .then((response: APIResponseElement<Episode>) => {
          setEpisode(response.status === 200 ? response.data : ({} as Episode))
          resolve(response.data)
        })
        .catch((e: Error) => {
          setEpisode({} as Episode)
          reject(e)
        })
    })
  }

  return {
    episodes,
    loading,
    episodeDetail,
    getEpisodes,
    setEpisodes,
    getEpisodeById,
    setEpisode,
  }
})
