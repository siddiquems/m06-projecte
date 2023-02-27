/**
   * @file Typescript file. Manages the Users services
   * @version 1.2
   * @author Siddique Muhammad
*/

import { Injectable } from '@angular/core';
import { User } from '../models/User_full';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

// Class UsersServiceService
export class UsersServicesService {
  url:string='http://localhost:3000';

  private usuariSubject: BehaviorSubject<User>;
  public usuario:Observable<User>; 

  public usuariData():User{
    return this.usuariSubject.value;
  }

  // Constructor
  constructor(private http: HttpClient) { 
    this.usuariSubject= new BehaviorSubject<User>(JSON.parse(localStorage.getItem('usuari')!));//estat inicial del BehaviorSubject
    this.usuario=this.usuariSubject.asObservable();
   
   }


  
  validatingLogin(login: User):Observable<User>{
    return this.http.post<User>(this.url+"/login", login, {responseType: "json" }).pipe(
      map(res =>{
        console.log("Resposta del servidor");
        console.log(JSON.stringify(res));

        if(res!=null){
          const user:User = new User(res.username, res.password);
          console.log("Objecte Usuari");
          console.log(user);
          
          localStorage.setItem('user',JSON.stringify(res));
          // console.log("LocalStorage");
          // console.log(localStorage.getItem('usuari'));

          this.usuariSubject.next(user);
        }
        return res;

      })
    );
  }


  
  logout(){
    localStorage.removeItem('usuari');
     
    this.usuariSubject.next(JSON.parse(null!));
  }

  
  
}
