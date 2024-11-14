import { Injectable, inject } from '@angular/core';
import { UserService } from '../../user/services/user.service';
import { HttpClient } from '@angular/common/http';
import { AcquiredItem } from '../interface/acquired-item';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../user/interfaces/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AcquiredService {
  db = inject(UserService);
  http = inject(HttpClient);
  private _snackBar = inject(MatSnackBar);

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
          this._snackBar.open("Item added to acquired", 'Undo',{
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          console.log(data);
        },
        error: (err : Error) => {console.log(err)}
     })
    }else{
      this._snackBar.open("item already on acquired items", 'Undo',{
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
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

 deleteAcquired(item: AcquiredItem) :  Observable<User>{
  // if(this.acquired.value.some(x => x.id == item.id && item.type == x.type)){
    let rta = this.http.patch<User>(`${this.url}/${this.db.getUserId()}`,{
      acquired: this.acquired.value.filter(x => (x.id != item.id || x.type != item.type))
    })
    
    rta.subscribe({
      next: (data) => {
        this.changeAcquired(data.acquired);
      },
      error: (err: Error) => {console.log(err)}
    })
    return rta;
  // } else{
  //   console.log('item a borrar no encontrado');
  // }
}

  changeAcquired(data:AcquiredItem[]){
    this.acquired.next(data)
  }
}
