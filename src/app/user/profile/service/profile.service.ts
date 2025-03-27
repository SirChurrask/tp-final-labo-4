import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '../../auth/service/user.service';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  db = inject(UserService);
  http = inject(HttpClient);

  private url = 'http://localhost:3000/user';
  private avatar =  new BehaviorSubject<string>('');
  currentdata = this.avatar.asObservable();

  private loading = new BehaviorSubject<boolean>(true);
  currentLoading = this.loading.asObservable();

  changeLoading(data: boolean){
    this.loading.next(data)
  }

  putAvatar(item: string) : void{
        this.http.patch<User>(`${this.url}/${this.db.getUserId()}`,{
          avatar: item
        }).subscribe({
          next: (data) => {
            this.changeAvatar(data.avatar);
          },
          error: (err : Error) => {console.log(err)}
       })
    }

  getAvatar() : void{
    this.changeLoading(true);
    this.http.get<User>(`${this.url}/${this.db.getUserId()}`).subscribe({
       next: (data) => {
         this.changeAvatar(data.avatar);
       },
       error: (err : Error) => {console.log(err)}
    })
 }

 changeAvatar(data:string){
    this.avatar.next(data);
    this.changeLoading(false);
  }
}