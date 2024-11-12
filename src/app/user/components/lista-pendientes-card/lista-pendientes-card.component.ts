import { Component, Input } from '@angular/core';
import { Weapon } from '../../../weapon/interface/weapon';

@Component({
  selector: 'app-lista-pendientes-card',
  standalone: true,
  imports: [],
  templateUrl: './lista-pendientes-card.component.html',
  styleUrl: './lista-pendientes-card.component.css'
})
export class ListaPendientesCardComponent {
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
}
