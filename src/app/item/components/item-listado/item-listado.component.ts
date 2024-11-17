import { Component, inject, OnInit } from '@angular/core';
import { Item } from '../../interface/item';
import { ItemService } from '../../service/item.service';
import { ItemCardComponent } from '../item-card/item-card.component';
import { SearchComponent } from '../../../shared/components/search/search.component';

@Component({
  selector: 'app-item-listado',
  standalone: true,
  imports: [ItemCardComponent,SearchComponent],
  templateUrl: './item-listado.component.html',
  styleUrl: './item-listado.component.css'
})
export class ItemListadoComponent implements OnInit{

  ItemService =  inject(ItemService);

  AllItems: Array<Item> = [];

  search:string = '';

  nombres(){
    return this.AllItems.map(x => x.name)
  }

  activeFilterSearch(str:string){
    this.search = str;
  }

  filtrarSearch(){
    return this.AllItems.filter(x => x.name.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()));
  }

  ngOnInit(){
    this.ItemService.currentData.subscribe(
      value => {
        this.AllItems = value;
      }
    );
    this.ItemService.getItems();
  }
}
