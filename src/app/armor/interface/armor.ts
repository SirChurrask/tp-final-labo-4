import { Item } from "../../item/interface/item"
import { Skill } from "./skill"

export interface Armor {

    id: string,
    type: string,
    rank: string,
    rarity: number,
    defense: {
      base: number,
      max: number,
      augmented: number
    },
    resistances: {
      fire: number,
      water: number,
      ice: number,
      thunder: number,
      dragon: number
    },
    attributes: {
      extra: string
    },
    name: string,
    slots: [{
      rank: number
    }],
    skills: Skill[],
    armorSet: {
      id: number,
      rank: string,
      name: string,
      pieces: Array<number>,
      bonus: number | null
    },
    assets: {
      imageMale: string | null,
      imageFemale: string | null
    },
    crafting: {
      materials: Material[]
    }
}

export interface Material{
  quantity: number,
  item: Item
} 
