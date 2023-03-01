/**
   * @file Typescript file. Manages the Users services. 
   *       Includes services of login, logout, and registration
   * @version 1.2
   * @author Siddique Muhammad
*/

// Imports
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

// Class UsersServiceService
export class UsersServicesService {

  // URL from the server
  url:string='http://localhost:3000';

  // Definitions
  private usuariSubject: BehaviorSubject<User>;
  public usuario:Observable<User>; 

  /**
   * @description get user data
   * @returns User object data
   */
  public usuariData():User{
    // console.log(this.usuariSubject)
    return this.usuariSubject.value;
  }

  // Constructor
  constructor(private http: HttpClient) { 
    this.usuariSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')!));//estat inicial del BehaviorSubject
    this.usuario =this.usuariSubject.asObservable();
   
  }
  
  /**
   * @description performs login validation
   * @param user the username and password of the user 
   * @returns response from the server
   */
  validatingLogin(login: User) : Observable<any> {
    return this.http.post<any>(this.url+"/login", login, {responseType: "json" }).pipe(
      map(res =>{

        // Per fer proves i mirar si funciona
        console.log("Resposta del servidor");
        console.log(JSON.stringify(res));

        // Si la res no és null
        if(res!=null){

          // new User
          const user : User = new User(res.username, res.password, res.role, res.name, res.age);
          console.log("Objecte Usuari");
          // console.log(user);

          // Creation of LocalStorage
          localStorage.setItem('token', res.accessToken);
          localStorage.setItem('user',JSON.stringify(res));
          // console.log("LocalStorage");
          console.log(localStorage.getItem('user'));

          this.usuariSubject.next(user);
        }
        return res;
      })
    );
  }

  /**
   * @description performs logout
   */
  logout(){

    // Removes the items in localstorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // Another option, clear all local storage data
    // localStorage.clear()

    this.usuariSubject.next(JSON.parse(null!));
  }

  /**
   * @description permorms the registration of a user
   * @param username is the username of the user
   * @param password is the password of the user
   * @returns response from the server
   */
  registerUser(username:any, password:any,role:any, name:any, age:any ):Observable<User>{

    return this.http.post<User>(this.url+'/register',{'username':username, 'password':password, 'role':role, 'name':name, 'age':age},{responseType:'json'})
  }
  
}
