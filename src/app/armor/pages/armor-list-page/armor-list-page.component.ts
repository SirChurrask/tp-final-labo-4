import { Component } from '@angular/core';
import { ArmorCardComponent } from "../../armor_sets/armor-card/armor-card.component";
import { ArmorListComponent } from "../../armor_sets/armor-list/armor-list.component";
import { TitleComponent } from "../../../shared/components/title/title.component";

@Component({
  selector: 'app-armor-list-page',
  standalone: true,
  imports: [ArmorListComponent, TitleComponent],
  templateUrl: './armor-list-page.component.html',
  styleUrl: './armor-list-page.component.css'
})
export class ArmorListPageComponent {

}
