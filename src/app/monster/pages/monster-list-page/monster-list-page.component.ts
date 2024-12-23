import { Component } from '@angular/core';
import { MonstListadoComponent } from "../../components/monst-listado/monst-listado.component";
import { TitleComponent } from "../../../shared/components/title/title.component";

@Component({
  selector: 'app-monster-list-page',
  standalone: true,
  imports: [MonstListadoComponent, TitleComponent],
  templateUrl: './monster-list-page.component.html',
  styleUrl: './monster-list-page.component.css'
})
export class MonsterListPageComponent {

}
