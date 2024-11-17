import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { Monster, resistance, weakness, location, aligment, recovery, protection, skill, reward, condition } from './../interface/monster';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  constructor(private http: HttpClient) { }
  UrlBase: string = 'https://mhw-db.com/monsters';

  private monsters = new BehaviorSubject<Monster[]>([]);
  currentData = this.monsters.asObservable();

  private loading = new BehaviorSubject<boolean>(true);
  currentLoading = this.loading.asObservable();

  changeLoading(data: boolean){
    this.loading.next(data)
  }

  changeMonsters(data: Monster[]){
    this.monsters.next(data);
    this.changeLoading(false);
  }

  getMonsters(){
    this.changeLoading(true);
    if(!this.monsters.value.length){
      let response = this.http.get<Monster[]>(this.UrlBase)
      response.subscribe({
          next: (data) => {
            this.changeMonsters(data);
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

  getMonstersValue(){
    return this.monsters.value;
  }

  getMonstersbyid(id: number): Observable<Monster>{
    this.changeLoading(true);
    let rta = this.http.get<Monster>(`${this.UrlBase}/${id}`);
    
    rta.subscribe({
      next: () => {
        this.changeLoading(false);
      },
      error: (err: Error) => {
        console.log(err);
      }
    });

    return rta;
  }
}
