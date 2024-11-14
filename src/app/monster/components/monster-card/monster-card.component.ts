import { Component, inject, Input } from '@angular/core';
import { Monster } from '../../interface/monster';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monster-card',
  standalone: true,
  imports: [],
  templateUrl: './monster-card.component.html',
  styleUrl: './monster-card.component.css'
})
export class MonsterCardComponent {

  routes = inject(Router);

  @Input() monster : Monster = {
    id: 0,
    type: '',
    species: '',
    elements: [],
    name: '',
    description: '',
    ailments: [],
    locations: [],
    resistances: [],
    weaknesses: [],
    rewards: []
  }

  routeDetalles(id: number){
    this.routes.navigate([`Monsters/${id}`]);
  }
}
