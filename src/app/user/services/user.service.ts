import { inject, Injectable } from '@angular/core';
import { finalize, Observable , of , BehaviorSubject} from 'rxjs';
import { User } from '../interfaces/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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
    
    return this.http.post<User>(this.url,user);
  }

  getUserAvilable(term: string): Observable<User[]>{
    const params = new HttpParams({fromString: `username=${term}`});
    return this.http.request<User[]>('GET', this.url, {responseType:'json', params});
  }

  getUsersByParams(term: any): Observable<User[]>{
    return this.http.get<User[]>( this.url, {params: term});
  }

  login(term: any) : Observable<boolean>{
    return this.getUsersByParams(term).pipe(
      map( response => {
        if(response.length){
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