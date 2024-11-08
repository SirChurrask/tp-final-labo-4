import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Monster, resistance, weakness, location, aligment, recovery, protection, skill, reward, condition } from './../interface/monster';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  constructor(private http: HttpClient) { }
  UrlBase: string = 'https://mhw-db.com/monsters';

  getMonsters(): Observable<Monster[]>{
    return this.http
    .get<Monster[]>(this.UrlBase);
  }

  getMonstersbyid(id: number): Observable<Monster>{
    console.log(`${this.UrlBase}/${id}`);
    return this.http
    .get<Monster>(`${this.UrlBase}/${id}`);
  }
}
