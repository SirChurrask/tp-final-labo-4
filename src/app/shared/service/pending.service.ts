import { inject, Injectable } from '@angular/core';
import { UserService } from '../../user/services/user.service';
import { HttpClient } from '@angular/common/http';
import { WantedItem } from '../interface/wanted-item';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../user/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class PendingService {
  db = inject(UserService);
  http = inject(HttpClient);
  private url = 'http://localhost:3000/user';
  private pending =  new BehaviorSubject<WantedItem[]>([]);
  currentData = this.pending.asObservable();

  putPending(item: WantedItem) : void{
    if(!this.pending.value.some(x => x.id === item.id)){
      this.http.patch<User>(`${this.url}/${this.db.getUserId()}`,{
        pending:[...this.pending.value,item]
      }).subscribe({
        next: (data) => {
          this.changePending(data.pending);
          console.log(data);
        },
        error: (err : Error) => {console.log(err)}
     })
    }else{
      console.log("item alredy on wanted items")
    }

  }

  getPending() : void{
     this.http.get<User>(`${this.url}/${this.db.getUserId()}`).subscribe({
        next: (data) => {
          this.changePending(data.pending);
        },
        error: (err : Error) => {console.log(err)}
     })
  }

  changePending(data:WantedItem[]){
    this.pending.next(data)
  }

}
