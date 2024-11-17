import { Component } from '@angular/core';
import { ArmorSetDetailsComponent } from "../../armor_sets/armor-set-details/armor-set-details.component";

@Component({
  selector: 'app-armor-set-page',
  standalone: true,
  imports: [ArmorSetDetailsComponent],
  templateUrl: './armor-set-page.component.html',
  styleUrl: './armor-set-page.component.css'
})
export class ArmorSetPageComponent {

}
