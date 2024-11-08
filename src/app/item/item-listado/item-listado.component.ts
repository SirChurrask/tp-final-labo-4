import { Component, inject, OnInit } from '@angular/core';
import { ItemService } from '../service/item.service';
import { Item } from '../interface/item';

@Component({
  selector: 'app-item-listado',
  standalone: true,
  imports: [],
  templateUrl: './item-listado.component.html',
  styleUrl: './item-listado.component.css'
})
export class ItemListadoComponent implements OnInit{

  AllItems: Array<Item> = [
    /*{
    id: 69,
    name: "testItem",
    description: "testea cosas",
    rarity: 0,
    carryLimit: 0,
    value: 0
  }*/
];

  ItemService =  inject(ItemService);

  listar(){
    this.ItemService.getItems().subscribe(
    {
      next: (Items: Item[]) => {
        this.AllItems = Items
      },
      error: (err: Error) => {
        console.log(err.message);
      }
    })
  }

  ngOnInit(){
    this.listar();
  }
}
