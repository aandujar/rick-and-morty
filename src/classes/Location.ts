export class Location {
  id: number
  name: string
  type: string
  dimension: string
  residents: string[]
  image: string

  constructor(
    id: number,
    name: string,
    type: string,
    dimension: string,
    residents: string[],
  ) {
    this.id = id
    this.name = name
    this.type = type
    this.dimension = dimension
    this.residents = residents
    this.image = `/src/assets/images/dimension/${this.id}.jpg`
  }
}
