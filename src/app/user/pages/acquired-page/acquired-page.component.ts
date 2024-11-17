import { Component } from '@angular/core';
import { AcquiredListComponent } from "../../adquiredList/components/acquired-list/acquired-list.component";

@Component({
  selector: 'app-acquired-page',
  standalone: true,
  imports: [AcquiredListComponent],
  templateUrl: './acquired-page.component.html',
  styleUrl: './acquired-page.component.css'
})
export class AcquiredPageComponent {

}
