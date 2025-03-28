import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeaponCardComponent } from '../../../../weapon/component/weapon-card/weapon-card.component';
import { ArmorCardComponent } from '../../../../armor/armor_sets/armor-card/armor-card.component';
import { Weapon } from '../../../../weapon/interface/weapon';
import { Armor } from '../../../../armor/interface/armor';


@Component({
  selector: 'app-acquired-list-card',
  standalone: true,
  imports: [CommonModule, ArmorCardComponent, WeaponCardComponent],
  templateUrl: './acquired-list-card.component.html',
  styleUrl: './acquired-list-card.component.css'
})
export class AcquiredListCardComponent {
  @Input() weapon : Weapon = {
    id :'',
    type : '',
    rarity: 0,
    attack: {
      display: 0,
      raw: 0
    },
    elderseal: null,
    attributes: {},
    damageType: '',
    name: '',
    durability: [
    {
    red: 0,
    orange: 0,
    yellow: 0,
    green: 0,
    blue: 0,
    white: 0,
    purple: 0
    }
    ],
    slots: [{
      rank: 0
    }],
    elements: [{
      type: '',
      damage: 0,
      hidden: false
    }],
    crafting: {
    craftable: false,
    previous: null,
    branches: [],
    craftingMaterials: [],
    upgradeMaterials: []
    },
    assets: {
    icon: '',
    image: ''
    }

  };
  @Input() armor : Armor = {
    id: '',
    type: '',
    rank: '',
    rarity: 0,
    defense: {
      base: 0,
      max: 0,
      augmented: 0
    },
    resistances: {
      fire: 0,
      water: 0,
      ice: 0,
      thunder: 0,
      dragon: 0
    },
    attributes: {
      extra: ''
    },
    name: '',
    slots: [{
      rank: 0
    }],
    skills: [],
    armorSet: {
      id: 0,
      rank: '',
      name: '',
      pieces: [],
      bonus: null
    },
    assets: {
      imageMale: null,
      imageFemale: null
    },
    crafting: {
      materials: [
        {
          quantity: 0,
          item: {
            id: 69,
            name: "testItem",
            description: "testea cosas",
            rarity: 0,
            carryLimit: 0,
            value: 0
          }
        }
      ]
    }
  };

  @Input() armorCheck: boolean = false;
  @Input() weaponCheck: boolean = false;

  @Output() deleteAcquiredEvent = new EventEmitter();

  deleteAcquired(){
    if (this.armorCheck && !this.weaponCheck){
      this.deleteAcquiredEvent.emit({
        id: this.armor.id,
        type: 'armor'
      })
    } else if (!this.armorCheck && this.weaponCheck){
      this.deleteAcquiredEvent.emit({
        id: this.weapon.id,
        type: 'weapon'
      })
    }
  }
}
