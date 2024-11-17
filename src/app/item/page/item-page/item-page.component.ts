import { Component, inject, OnInit } from '@angular/core';
import { ItemListadoComponent } from '../../components/item-listado/item-listado.component';
import { ItemService } from '../../service/item.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-page',
  standalone: true,
  imports: [ItemListadoComponent,CommonModule],
  templateUrl: './item-page.component.html',
  styleUrl: './item-page.component.css'
})
export class ItemPageComponent{

}
