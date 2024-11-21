import { PaginationFilter } from '@/classes/PaginationFilter'

export class LocationFilter extends PaginationFilter {
  name?: string
  type?: string
  dimension?: string

  constructor(page: number, name?: string, type?: string, dimension?: string) {
    super(page)
    this.name = name || ''
    this.type = type || ''
    this.dimension = dimension || ''
  }
}
