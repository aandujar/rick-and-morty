import { PaginationFilter } from '@/classes/PaginationFilter'

export class EpisodeFilter extends PaginationFilter {
  name?: string
  episode?: string

  constructor(page: number, name?: string, episode?: string) {
    super(page)
    this.name = name || ''
    this.episode = episode || ''
  }
}
