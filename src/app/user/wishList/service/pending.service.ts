import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../auth/service/user.service';
import { User } from '../../interfaces/user';
import { WantedItem } from '../../interfaces/wanted-item';

@Injectable({
  providedIn: 'root'
})

export class PendingService {
  db = inject(UserService);
  http = inject(HttpClient);
  private _snackBar = inject(MatSnackBar);
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
          this._snackBar.open("Item added to wanted", 'Undo',{
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          console.log(data);
        },
        error: (err : Error) => {console.log(err)}
     })
    }else{
      this._snackBar.open("item already on wanted items", 'Undo',{
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      console.log("item alredy on wanted items")
    }
  }

  updatePending(item: WantedItem[]) : Observable<User>{
      let rta = this.http.patch<User>(`${this.url}/${this.db.getUserId()}`,{
        pending:item
      })

      rta.subscribe({
        next: (data) => {
          this.changePending(data.pending);
        },
        error: (err : Error) => {console.log(err)}
     })

      return rta;
  }

  getPending() : Observable<User>{
     let rta = this.http.get<User>(`${this.url}/${this.db.getUserId()}`);
     
     rta.subscribe({
        next: (data) => {
          this.changePending(data.pending);
        },
        error: (err : Error) => {console.log(err)}
     })

     return rta;
  }

  deletePending(item: WantedItem) : WantedItem{
    if(this.pending.value.some(x => x.id == item.id && item.type == x.type)){
      this.http.patch<User>(`${this.url}/${this.db.getUserId()}`,{
        pending: this.pending.value.filter(x => (x.id != item.id || x.type != item.type))
      }).subscribe({
        next: (data) => {
          this.changePending(data.pending);
        },
        error: (err: Error) => {console.log(err)}
      })
    } else{
      console.log('item a borrar no encontrado');
    }
    return item;
  }

  changePending(data:WantedItem[]){
    this.pending.next(data)
  }

}
