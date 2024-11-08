export interface Rank {
  id: number,
  level: number,
  modifiers: {
    extra: number
  },
  description: string,
  skill: number,
  skillName: string
}
