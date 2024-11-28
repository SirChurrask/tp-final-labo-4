import { Component } from '@angular/core';
import { WeaponListComponent } from "../../component/weapon-list/weapon-list.component";
import { TitleComponent } from "../../../shared/components/title/title.component";

@Component({
  selector: 'app-weapon-list-page',
  standalone: true,
  imports: [WeaponListComponent, TitleComponent],
  templateUrl: './weapon-list-page.component.html',
  styleUrl: './weapon-list-page.component.css'
})
export class WeaponListPageComponent {

}
