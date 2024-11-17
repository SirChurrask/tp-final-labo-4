import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Armor } from '../interface/armor';
import { ArmorSet } from '../interface/armor-set';

@Injectable({
  providedIn: 'root'
})
export class ArmorService {

  constructor(private http: HttpClient) { }
  urlBase: string = "https://mhw-db.com/armor";

  private armors = new BehaviorSubject<Armor[]>([]);
  currentData = this.armors.asObservable()

  private loading = new BehaviorSubject<boolean>(true);
  currentLoading = this.loading.asObservable();

  changeLoading(data: boolean){
    this.loading.next(data)
  }

  changeArmor(data: Armor[]){
    this.armors.next(data);
    this.changeLoading(false);
  }

  getArmorValue(){
    return this.armors.value;
  }

  getArmors(){
    this.changeLoading(true);
    if(!this.armors.value.length){
      let response = this.http.get<Armor[]>(this.urlBase)
      response.subscribe({
          next: (data) => {
            this.changeArmor(data);
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

  getArmorById(id: string): Armor{
    return this.armors.value.filter(x => {return x.id === id})[0];
  }

  getArmorSetByID(id: string | null): Observable<ArmorSet> {
    this.changeLoading(true);
    let response = this.http.get<ArmorSet>(`${this.urlBase}/sets/${id}`);
    response.subscribe({
      next: (data) => {
        this.changeLoading(false);
      },
      error: (err: Error) => {
        console.log(err);
      }
    })
    return response;
  }
}  //Even flow
