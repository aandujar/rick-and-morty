import mitt from 'mitt'

type Events = {
  goCharacterDetail: number
}

export const emitter = mitt<Events>()
