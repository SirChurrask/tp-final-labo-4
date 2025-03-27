import { Component } from '@angular/core';
import { Monster } from '../../monster/interface/monster';
import { CommonModule } from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { Item } from '../../item/interface/item';
import { Weapon } from '../../weapon/interface/weapon';
import { Armor } from '../../armor/interface/armor';
import { TitleComponent } from "../../shared/components/title/title.component";

@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, MatButtonModule, TitleComponent],
  templateUrl: './guide.component.html',
  styleUrl: './guide.component.css'
})
export class GuideComponent {
//ejemplos para mostrar
  monster : Monster = {
    id: 18,
    type: 'large',
    species: 'bird wyvern',
    elements: [],
    name: 'Kulu-Ya-Ku',
    description: 'An odd bird wyvern that has developed limbs capable of carrying weapons. Its been spotted stealing eggs from nests found in the Ancient Forest and Wildspire Waste.',
    ailments: [],
    locations: [{
      "id": 1,
      "zoneCount": 17,
      "name": "Ancient Forest"
      },
      {
      "id": 3,
      "zoneCount": 15,
      "name": "Wildspire Waste"
      }],
    resistances: [],
    weaknesses: [{
      "element": "fire",
      "stars": 2,
      "condition": null
      },
      {
      "element": "water",
      "stars": 3,
      "condition": null
      },
      {
      "element": "thunder",
      "stars": 2,
      "condition": null
      },
      {
      "element": "ice",
      "stars": 2,
      "condition": null
      },
      {
      "element": "dragon",
      "stars": 2,
      "condition": null
      },
      {
      "element": "blast",
      "stars": 2,
      "condition": null
      },
      {
      "element": "paralysis",
      "stars": 2,
      "condition": null
      },
      {
      "element": "poison",
      "stars": 2,
      "condition": null
      },
      {
      "element": "sleep",
      "stars": 2,
      "condition": null
      },
      {
      "element": "stun",
      "stars": 2,
      "condition": null
      }],
    rewards: []
  };
  item : Item = {
    id: 4,
    name: 'Ancient Potion',
    description: 'Fully restores health and maximizes the size of your Health and Stamina Gauges.',
    rarity: 5,
    carryLimit: 1,
    value: 345
  };
  weapon : Weapon = {
      id :'170',
      type : 'sword-and-shield',
      rarity: 1,
      attack: {
        display: 112,
        raw: 80
      },
      elderseal: null,
      attributes: {},
      damageType: 'sever',
      name: 'Hunters Knife 1',
      durability: [
        {
        red: 90,
        orange: 50,
        yellow: 80,
        green: 30,
        blue: 0,
        white: 0,
        purple: 0
        }
      ],
      slots: [{
        rank: 0
      }],
      elements: [],
      crafting: {
        craftable: true,
        previous: null,
        branches: [171],
        craftingMaterials: [{
          quantity: 1,
          item: {
            id: 116,
            rarity: 4,
            carryLimit: 99,
            value: 60,
            name: 'Iron Ore',
            description: 'Ore that can be smelted into metal and used for many different purposes.'
          }
          }],
        upgradeMaterials: []
      },
      assets: {
        icon: 'https://assets.mhw-db.com/weapons/sword-and-shield/icons/bba6138275380056204165eb9ed5d9cb.2e880e7ffa9e558cef1365b0d2e492a092f399a8.png',
        image: 'https://assets.mhw-db.com/weapons/sword-and-shield/5a840cbcadb5ce93fcb8b561be25e4157f0b8226.9768936caf3bdef1e9e3ce81cd1f6189.png'
      }

  };
  armor : Armor = {
    id: '129',
    type: 'head',
    rank: 'low',
    rarity: 4,
    defense: {
      base: 30,
      max: 54,
      augmented: 74
    },
    resistances: {
      fire: -1,
      water: 2,
      ice: 3,
      thunder: -3,
      dragon: 0
    },
    attributes: {
      extra: ''
    },
    name: 'Legiana Helm',
    slots: [{
      rank: 0
    }],
    skills: [
      {
        id: 252,
        name: 'Divine Blessing',
        description: 'While active, reduces damage taken by 15%.',
        skillName: 'Divine Blessing',
        ranks: [],
        level: 1
      }
    ],
    armorSet: {
      id: 29,
      rank: 'low',
      name: 'Legiana',
      pieces: [
        129,
        130,
        131,
        132,
        133],
      bonus: 2
    },
    assets: {
      imageMale: 'https://assets.mhw-db.com/armor/6abb6b059482c625ed4d8e28d601946324d121ab.42f9967a841c07ac7c593279ba0b3655.png',
      imageFemale: 'https://assets.mhw-db.com/armor/faa11f26218334eb44ade2d91d241e5a18eb5f30.5e9e0dcddcc349d380e125ecdb027b8d.png'
    },
    crafting: {
      materials: [
        {
          quantity: 2,
          item: {
            id: 318,
            rarity: 4,
            carryLimit: 99,
            value: 540,
            name: 'Legiana Scale',
            description: 'Legiana material. Mostly obtained by carving. Broadly used for many purposes.'
          }
          },
          {
          quantity: 1,
          item: {
            id: 319,
            rarity: 4,
            carryLimit: 99,
            value: 790,
            name: 'Legiana Hide',
            description: 'Legiana material. Mostly obtained as a reward. Solid, used to craft gear.'
          }
          },
          {
          quantity: 1,
          item: {
            id: 320,
            rarity: 4,
            carryLimit: 99,
            value: 1040,
            name: 'Legiana Claw',
            description: 'Legiana material. Mostly obtained by carving. Grants ice elemental properties.'
          }
          },
          {
          quantity: 2,
          item: {
            id: 204,
            rarity: 4,
            carryLimit: 99,
            value: 220,
            name: 'Shamos Scale',
            description: 'Shamos material. Obtained by carving. Used for many purposes.'
          }
          }
      ]
    }
  };
}
