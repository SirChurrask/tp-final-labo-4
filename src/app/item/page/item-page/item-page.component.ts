import { Component } from '@angular/core';
import { ItemListadoComponent } from '../../components/item-listado/item-listado.component';

@Component({
  selector: 'app-item-page',
  standalone: true,
  imports: [ItemListadoComponent],
  templateUrl: './item-page.component.html',
  styleUrl: './item-page.component.css'
})
export class ItemPageComponent {
  
}
