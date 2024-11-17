import { Component } from '@angular/core';
import { MonstListadoComponent } from "../../components/monst-listado/monst-listado.component";

@Component({
  selector: 'app-monster-list-page',
  standalone: true,
  imports: [MonstListadoComponent],
  templateUrl: './monster-list-page.component.html',
  styleUrl: './monster-list-page.component.css'
})
export class MonsterListPageComponent {

}
