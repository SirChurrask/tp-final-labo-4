import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../auth/service/user.service';
import { AcquiredItem } from '../../interfaces/acquired-item';
import { User } from '../../interfaces/user';

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

  private loading = new BehaviorSubject<boolean>(true);
  currentLoading = this.loading.asObservable();

  changeLoading(data: boolean){
    this.loading.next(data)
  }

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
    this.changeLoading(true);
    this.http.get<User>(`${this.url}/${this.db.getUserId()}`).subscribe({
       next: (data) => {
         this.changeAcquired(data.acquired);
       },
       error: (err : Error) => {console.log(err)}
    })
 }

 deleteAcquired(item: AcquiredItem) :  Observable<User>{

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
}

  changeAcquired(data:AcquiredItem[]){
    this.acquired.next(data);
    this.changeLoading(false);
  }
}
