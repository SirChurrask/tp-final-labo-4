import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Weapon } from '../interface/weapon';

@Injectable({
  providedIn: 'root'
})
export class WeaponsService {

  constructor(private http: HttpClient) { }
  urlbase: string = 'https://mhw-db.com/weapons'

  private weapons = new BehaviorSubject<Weapon[]>([]);
  currentData = this.weapons.asObservable();

  changeWeapons(data: Weapon[]){
    this.weapons.next(data)
  }

  getWeaponsValue(){
    return this.weapons.value;
  }

  getWeapons(){
    if(!this.weapons.value.length){
      let response = this.http.get<Weapon[]>(this.urlbase)
      response.subscribe({
          next: (data) => {
            this.changeWeapons(data);
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

  getWeaponbyId(id: string) : Weapon{
    return this.weapons.value.filter(x => {return x.id === id})[0];
  }

  /*getWeaponbyId(id: string): Observable<Weapon>{
    return this.http.get<Weapon>(`${this.urlbase}/${id}`);
  }*/
}
