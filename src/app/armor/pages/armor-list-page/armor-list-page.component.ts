import { Component } from '@angular/core';
import { ArmorCardComponent } from "../../armor_sets/armor-card/armor-card.component";
import { ArmorListComponent } from "../../armor_sets/armor-list/armor-list.component";

@Component({
  selector: 'app-armor-list-page',
  standalone: true,
  imports: [ ArmorListComponent],
  templateUrl: './armor-list-page.component.html',
  styleUrl: './armor-list-page.component.css'
})
export class ArmorListPageComponent {

}
