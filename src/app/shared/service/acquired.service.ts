import { Injectable, inject } from '@angular/core';
import { UserService } from '../../user/services/user.service';
import { HttpClient } from '@angular/common/http';
import { AcquiredItem } from '../interface/acquired-item';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../user/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AcquiredService {
  db = inject(UserService);
  http = inject(HttpClient);
  private url = 'http://localhost:3000/user';
  private acquired =  new BehaviorSubject<AcquiredItem[]>([]);
  currentdata = this.acquired.asObservable();

  putAcquired(item: AcquiredItem) : void{
    if(!this.acquired.value.some(x => x.id === item.id)){
      this.http.patch<User>(`${this.url}/${this.db.getUserId()}`,{
        acquired:[...this.acquired.value,item]
      }).subscribe({
        next: (data) => {
          this.changeAcquired(data.acquired);
          console.log(data);
        },
        error: (err : Error) => {console.log(err)}
     })
    }else{
      console.log("item already on acquired items")
    }
  }

  getAcquired() : void{
    this.http.get<User>(`${this.url}/${this.db.getUserId()}`).subscribe({
       next: (data) => {
         this.changeAcquired(data.acquired);
       },
       error: (err : Error) => {console.log(err)}
    })
 }

  changeAcquired(data:AcquiredItem[]){
    this.acquired.next(data)
  }
}