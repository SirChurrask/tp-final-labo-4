import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-found',
  standalone: true,
  imports: [],
  templateUrl: './found.component.html',
  styleUrl: './found.component.css'
})
export class FoundComponent {
  @Input() items: Number = 0
}
