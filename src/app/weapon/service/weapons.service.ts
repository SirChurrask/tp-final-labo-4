import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weapon } from '../interface/weapon';

@Injectable({
  providedIn: 'root'
})
export class WeaponsService {

  constructor(private http: HttpClient) { }
  urlbase: string = 'https://mhw-db.com/weapons'

  getWeapons(): Observable<Weapon[]>{
    return this.http.get<Weapon[]>(this.urlbase);
  }


}
