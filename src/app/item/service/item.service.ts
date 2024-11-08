import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Item } from '../interface/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }
  urlBase: string = 'https://mhw-db.com/items'

  getItems(): Observable<Item[]>{
    return this.http
    .get<Item[]>(this.urlBase)
    .pipe(
      catchError((error)=>{
        console.log('Error: ',error);
        throw error;
      })
    );
  }
}
