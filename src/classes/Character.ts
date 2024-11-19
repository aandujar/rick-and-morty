import type { CharacterLocation } from './CharacterLocation'

export class Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  image?: string
  _origin?: CharacterLocation

  constructor(
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    image?: string,
    origin?: CharacterLocation,
  ) {
    this.id = id
    this.name = name
    this.status = status
    this.species = species
    this.type = type
    this.gender = gender
    if (image) {
      this.image = image
    }
    if (origin) {
      this._origin = origin
    }
  }

  public get origin(): string {
    let originName
    if (this._origin && this._origin.name && this._origin.name.length > 0) {
      originName = this._origin.name
    } else {
      originName = 'No origin'
    }
    return originName
  }
}
