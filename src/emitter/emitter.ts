import mitt from 'mitt'

type Events = {
  goCharacterDetail: number
  goEpisodeDetail: number
}

export const emitter = mitt<Events>()
