import { Component, inject, OnInit } from '@angular/core';
import { ItemListadoComponent } from '../../components/item-listado/item-listado.component';
import { ItemService } from '../../service/item.service';
import { CommonModule } from '@angular/common';
import { TitleComponent } from "../../../shared/components/title/title.component";

@Component({
  selector: 'app-item-page',
  standalone: true,
  imports: [ItemListadoComponent, CommonModule, TitleComponent],
  templateUrl: './item-page.component.html',
  styleUrl: './item-page.component.css'
})
export class ItemPageComponent{

}
