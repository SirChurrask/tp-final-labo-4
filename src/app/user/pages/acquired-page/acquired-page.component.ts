import { Component } from '@angular/core';
import { AcquiredListComponent } from "../../adquiredList/components/acquired-list/acquired-list.component";
import { TitleComponent } from "../../../shared/components/title/title.component";

@Component({
  selector: 'app-acquired-page',
  standalone: true,
  imports: [AcquiredListComponent, TitleComponent],
  templateUrl: './acquired-page.component.html',
  styleUrl: './acquired-page.component.css'
})
export class AcquiredPageComponent {

}
