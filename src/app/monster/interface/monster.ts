import { Item } from "../../item/interface/item"

export interface Monster {

    id: number,
    type: string,
    species: string,
    elements: Array<string>,
    name: string,
    description: string,
    ailments: Array<aligment>,
    locations: Array<location>,
    resistances: Array<resistance>,
    weaknesses: Array<weakness>,
    rewards: Array<reward>

}

export interface resistance {
  element: string,
  condition: string | null
}

export interface weakness {
  element: string,
  stars: number,
  condition: string | null
}

export interface location{
  id: number,
  zoneCount: number,
  name: string
}

export interface aligment{
  id: number,
  name: string,
  description: string,
  recovery: recovery,
  protection: protection
}

export interface recovery{
  actions: Array<string>,
  items: Array<Item>
}

export interface protection {
  skills: Array<skill>,
  items: Array<Item>
}

export interface skill{
  id: number,
  name: string,
  description: string
}

export interface reward{
  id: number,
  item: Item,
  condition: Array<condition>
}

export interface condition{
  type: string,
  rank: string,
  quantity: number,
  chance: number,
  subtype: string | null
}
