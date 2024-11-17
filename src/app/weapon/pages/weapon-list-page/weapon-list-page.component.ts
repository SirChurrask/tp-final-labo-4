import { Component } from '@angular/core';
import { WeaponListComponent } from "../../component/weapon-list/weapon-list.component";

@Component({
  selector: 'app-weapon-list-page',
  standalone: true,
  imports: [WeaponListComponent],
  templateUrl: './weapon-list-page.component.html',
  styleUrl: './weapon-list-page.component.css'
})
export class WeaponListPageComponent {

}
