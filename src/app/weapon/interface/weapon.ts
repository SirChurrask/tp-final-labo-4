import { Item } from "../../item/interface/item"

export interface Weapon {

    id: string,
    type: string,
    rarity: number,
    attack: {
      display: number,
      raw: number
    },
    elderseal: string | null,
    attributes: {
      attributes?: number,
      defense?: number,
    },
    damageType: string,
    name: string,
    durability: [
    {
    red: number,
    orange: number,
    yellow: number,
    green: number,
    blue: number,
    white: number,
    purple: number
    }
    ],
    slots: [{
      rank: number
    }],
    elements: element[],
    crafting: {
    craftable: boolean,
    previous: number|null,
    branches: number[],
    craftingMaterials: materiales[],
    upgradeMaterials: materiales[]
    },
    assets: {
      icon: string,
      image: string
    }

}

export interface materiales{
  quantity: number,
  item: Item
}

export interface element{
  type: string,
  damage: number,
  hidden: boolean
}
