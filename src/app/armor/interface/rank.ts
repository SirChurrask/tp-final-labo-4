export interface Rank {
  id: number,
  slug: string,
  level: number,
  modifiers: {
    extra: number
  },
  description: string,
  skill: number,
  skillName: string
}
