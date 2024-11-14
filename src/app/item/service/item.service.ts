import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { Item } from '../interface/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }
  urlBase: string = 'https://mhw-db.com/items'

  private items = new BehaviorSubject<Item[]>([]);
  currentData = this.items.asObservable();

  changeItems(data: Item[]){
    this.items.next(data)
  }

  getItems(){
    if(!this.items.value.length){
      let response = this.http.get<Item[]>(this.urlBase)
      response.subscribe({
          next: (data) => {
            this.changeItems(data);
          },
          error: (err: Error) => {
            console.log(err);
          }
        })
        return response;
      }else{
        return true;
      }
  }

  getItemsValue(){
    return this.items.value;
  }

}
