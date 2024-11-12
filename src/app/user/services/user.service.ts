import { inject, Injectable } from '@angular/core';
import { finalize, Observable , of , BehaviorSubject} from 'rxjs';
import { User } from '../interfaces/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as bcrypt from "bcryptjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  salt = bcrypt.genSaltSync(10);

  http = inject(HttpClient);
  private url = 'http://localhost:3000/user';
  router = inject(Router);

  private logged =  new BehaviorSubject<boolean>(false);
  currentData = this.logged.asObservable();

  private userId : string = '';

  getLogged(){
    return this.logged.value;
  }

  changeLogged(data: boolean){
    this.logged.next(data)
  }

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.url}/${username}`);
  }

  postUser(user: User): Observable<User> {
    user.acquired = [];
    user.pending = [];

    let salt = bcrypt.genSaltSync(10);
    let timestamp = Date.now();
    let key = salt + timestamp;
    let encodedPass = bcrypt.hashSync(user.password,key);

    user.password = encodedPass;
    
    return this.http.post<User>(this.url,user);
  }

  getUserAvilable(term: string): Observable<User[]>{
    const params = new HttpParams({fromString: `username=${term}`});
    return this.http.request<User[]>('GET', this.url, {responseType:'json', params});
  }

  getUsersByParams(term: any): Observable<User[]>{
    return this.http.get<User[]>( this.url, {params: term});
  }

  login(term: User) : Observable<boolean>{
    console.log(term)
    return this.getUsersByParams(term.username).pipe(
      map( response => {
          if(response.length && bcrypt.compareSync(term.password,response[0].password)){
            this.userId = response[0].id;
            this.changeLogged(true)
            this.router.navigate(['/']);
            return  true;
          }else{
            return false;
          }
        
      }),
      catchError(error => {
        console.error('Error al obtener datos:', error);
        return of(false);
      })
    )
  }

  logOut(){
    this.changeLogged(false)
    this.userId = "";
    this.router.navigate(['/']);
  }
}