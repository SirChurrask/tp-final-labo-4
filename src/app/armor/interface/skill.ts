import { Rank } from './rank';
export interface Skill {
id: number,
name: string,
description: string,
skillName: string,
ranks: Rank[]
}
