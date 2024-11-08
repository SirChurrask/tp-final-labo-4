import { inject, Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);
  url = 'http://localhost:3000/user';

  // async getAllUser(): Promise<User[]> {
  //   const data = await fetch(this.url);
  //   return await data.json() ?? [];
  // }

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  postUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  /*getUserAvilable(name: String): boolean {
      // let rta = false;
      // let source = this.http.get<User[]>(this.url);
      // source.pipe({

      // }).subscribe({
      //   next: (users: User[]) => { rta = users.some( x => { x.username == name}); return rta },
      //   error: (err: Error) => { console.log(err.message) }
      // });

      this.getAllUser().pipe(
        finalize(() => {

        }).subscribe({
        next: (users: User[]) => { return users.some( x => { x.username == name});},
        error: (err: Error) => { console.log(err.message) }
      }))

      
  }*/

}