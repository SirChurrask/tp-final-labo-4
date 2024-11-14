import { Component, Input } from '@angular/core';
import { Item } from '../../interface/item';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css'
})
export class ItemCardComponent {
  @Input() item : Item = {
    id: 0,
    name: '',
    description: '',
    rarity: 0,
    carryLimit: 0,
    value: 0
  }

}
