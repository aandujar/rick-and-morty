import { PaginationFilter } from '@/classes/PaginationFilter'

export class CharacterFilter extends PaginationFilter {
  name?: string
  status?: string
  gender?: string

  constructor(page: number, name?: string, status?: string, gender?: string) {
    super(page)
    this.name = name || ''
    this.status = status || ''
    this.gender = gender || ''
  }
}
