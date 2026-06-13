export type ProjectCategory =
  | 'client'
  | 'university'
  | 'infrastructure'
  | 'experiment'

export type ProjectStatus =
  | 'completed'
  | 'in-progress'
  | 'experimental'

export type Project = {
  title: string
  slug: string
  fileName: string
  folder: string
  year: string
  category: ProjectCategory
  status: ProjectStatus
  featured: boolean
  summary: string
  description: string
  role: string
  stack: string[]
  highlights: string[]
  links: {
    live?: string
    github?: string
    details?: string
  }
  images: string[]
}
