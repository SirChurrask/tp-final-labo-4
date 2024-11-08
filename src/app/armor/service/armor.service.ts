import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Armor } from '../interface/armor';

@Injectable({
  providedIn: 'root'
})
export class ArmorService {

  constructor(private http: HttpClient) {
    //ok i pull up (basicamente, tiene que cargar todo en un arreglo privado y con el subscribe hacer un slice del arreglo para paginarlo, ni idea como)
    //otra cosa, revisar el discord de la api, capaz ayuda
  }
  urlBase: string = "https://mhw-db.com/armor";

  getArmor(): Observable<Armor[]> {
    return this.http.get<Armor[]>(this.urlBase);
  }
}  //Even flow
