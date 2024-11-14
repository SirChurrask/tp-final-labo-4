import { Component, inject, OnInit } from '@angular/core';
import { Item } from '../../interface/item';
import { ItemService } from '../../service/item.service';
import { ItemCardComponent } from '../item-card/item-card.component';

@Component({
  selector: 'app-item-listado',
  standalone: true,
  imports: [ItemCardComponent],
  templateUrl: './item-listado.component.html',
  styleUrl: './item-listado.component.css'
})
export class ItemListadoComponent implements OnInit{

  ItemService =  inject(ItemService);

  AllItems: Array<Item> = [];

  ngOnInit(){
    this.ItemService.currentData.subscribe(
      value => {
        this.AllItems = value;
      }
    );
    this.ItemService.getItems();
  }
}
