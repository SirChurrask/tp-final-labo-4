import { Component } from '@angular/core';
import { MonsterDetailsComponent } from '../../components/monster-details/monster-details.component';

@Component({
  selector: 'app-monster-page',
  standalone: true,
  imports: [MonsterDetailsComponent],
  templateUrl: './monster-page.component.html',
  styleUrl: './monster-page.component.css'
  // encapsulation: ViewEncapsulation.None,

})
export class MonsterPageComponent{


}
