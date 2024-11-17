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

  private loading = new BehaviorSubject<boolean>(true);
  currentLoading = this.loading.asObservable();

  changeLoading(data: boolean){
    this.loading.next(data)
  }

  changeItems(data: Item[]){
    this.items.next(data)
    this.changeLoading(false);
  }

  getItems(){
    this.changeLoading(true);
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
        this.changeLoading(false);
        return true;
      }
  }

  getItemsValue(){
    return this.items.value;
  }

}
