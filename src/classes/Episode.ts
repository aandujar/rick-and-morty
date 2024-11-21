import type { CharacterLocation } from './CharacterLocation'

export class Episode {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  image: string

  constructor(
    id: number,
    name: string,
    air_date: string,
    episode: string,
    characters: string[],
  ) {
    this.id = id
    this.name = name
    this.air_date = air_date
    this.episode = episode
    this.characters = characters
    this.image = `src/assets/images/episode/${this.id}.jpg`
  }
}
