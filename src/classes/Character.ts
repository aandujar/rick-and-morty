import type { CharacterLocation } from './CharacterLocation'

export class Character {
  id: number
  name: string
  status: string
  species: string
  _type: string
  gender: string
  image?: string
  _origin?: CharacterLocation
  _location?: CharacterLocation
  created?: string
  episode: string[]

  constructor(
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    image?: string,
    origin?: CharacterLocation,
    location?: CharacterLocation,
    created?: string,
    episode?: string[],
  ) {
    this.id = id
    this.name = name
    this.status = status
    this.species = species
    this._type = type
    this.gender = gender
    if (image) {
      this.image = image
    }
    if (origin) {
      this._origin = origin
    }
    if (location) {
      this._location = location
    }
    if (created) {
      this.created = created
    }
    this.episode = episode ? [...episode] : []
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

  public get location(): string {
    let locationName
    if (
      this._location &&
      this._location.name &&
      this._location.name.length > 0
    ) {
      locationName = this._location.name
    } else {
      locationName = 'No location'
    }
    return locationName
  }

  public get type(): string {
    let typeName
    if (this._type && this._type.length > 0) {
      typeName = this._type
    } else {
      typeName = 'No type'
    }
    return typeName
  }
}
