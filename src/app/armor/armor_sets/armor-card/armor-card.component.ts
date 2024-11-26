import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Armor } from '../../interface/armor';
import { Router } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-armor-card',
  standalone: true,
  imports: [MatButtonModule, MatTooltipModule,CommonModule],
  templateUrl: './armor-card.component.html',
  styleUrl: './armor-card.component.css'
})
export class ArmorCardComponent {
  routes = inject(Router);
  @Output() addWantedEvent = new EventEmitter();
  @Output() addAcquiredEvent = new EventEmitter();
  @Input() showDetails : boolean = true;
  @Input() logged : boolean = false;
  @Input() armor : Armor ={
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
  }

  makeString(str:number){
    return "gem_level_" + str + ".png";
  }

  getString(str:string){
    return `mhw-${str}-damage_s.png`
  }

  getResistences(): {[key: string]: number} {
    return this.armor.resistances
  }

  addPending(){
    this.addWantedEvent.emit({
      id: this.armor.id,
      type: 'armor',
      materiales:  this.armor.crafting.materials.map((x) => {return {
        id: x.item.id,
        acquired: false
      }})
    })
  }

  addAcquired(){
    this.addAcquiredEvent.emit({
      id: this.armor.id,
      type: 'armor',
    })
  }

  routeDetalles(id: number){
    this.routes.navigate([`Armors/${id}`]);
  }
}
