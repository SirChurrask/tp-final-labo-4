import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Weapon, materiales } from '../../interface/weapon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weapon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weapon-card.component.html',
  styleUrl: './weapon-card.component.css'
})
export class WeaponCardComponent{

  @Output() addWantedEvent = new EventEmitter();
  @Output() addAcquiredEvent = new EventEmitter();
  @Input() logged : boolean = false;
  @Input() showImage : boolean = false;
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
    elements: [],
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

  addPending(){
    this.addWantedEvent.emit({
      id: this.weapon.id,
      type: 'weapon',
      materiales:  this.weapon.crafting.craftingMaterials.length ?
      (this.weapon.crafting.craftingMaterials.map((x) => {return {
        id: x.item.id,
        acquired: false
      }})) :
      (this.weapon.crafting.upgradeMaterials.map((x) => {return {
        id: x.item.id,
        acquired: false
      }}))
    })
  }

  addAcquired(){
    this.addAcquiredEvent.emit({
      id: this.weapon.id,
      type: 'weapon',
    })
  }
}
