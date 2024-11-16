import { Armor } from "./armor";
import { Rank } from "./rank";

export interface ArmorSet {
  id: number,
  rank: string,
  name: string,
  pieces: Array<Armor>,
  bonus: ArmorSetBonus | null,
}

export interface ArmorSetBonus{
  id: number,
  name: string,
  ranks: Array<ArmorSetBonusRank>,
}

export interface ArmorSetBonusRank{
  pieces: number,
  skill: Rank,
  description: string,
}
