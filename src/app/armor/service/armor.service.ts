import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Armor } from '../interface/armor';
import { ArmorSet } from '../interface/armor-set';

@Injectable({
  providedIn: 'root'
})
export class ArmorService {

  constructor(private http: HttpClient) { }
  urlBase: string = "https://mhw-db.com/armor";

  getArmor(): Observable<Armor[]> {
    return this.http.get<Armor[]>(this.urlBase);
  }

  getArmorById(id: string): Observable<Armor> {
    return this.http.get<Armor>(`${this.urlBase}/${id}`);
  }

  getArmorSetByID(id: string | null): Observable<ArmorSet> {
    return this.http.get<ArmorSet>(`${this.urlBase}/sets/${id}`);
  }
}  //Even flow
