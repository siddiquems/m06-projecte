/**
   * @file Typescript file. Manages the Users services
   * @version 1.2
   * @author Siddique Muhammad
*/

import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// Class UsersServiceService
export class UsersServicesService {

  // Constructor
  constructor() { 
    // this.createUsers[];
  }


  // Iniciar variables
  listUsers:User[]=[];
  role:string="";

  login : boolean = false;


  /**
   * @description Para el registro. Push the User with the received data
   * @version 1.2
   * @author Siddique Muhamamd
   * @param {class User}
  */

  getUsers(user:User){
    this.listUsers.push(user);
  }

  
  /**
   * @description Crea users de manera aleatòria
   * @version 1.2
   * @author Siddique Muhamamd
   * @return {class User}
  */
  createUsers():User[]{

    // Creacion de arrays con datos
    let usernames:string[]=[
      "userone",
      "usertwo",
      "userthree",
      "userfour"
    ]

    let passwords:string[] =[
      "passonee", 
      "passtwoo", 
      "passthree", 
      "passfouur"
    ]

    let roles:string[] = [
      "admin",
      "comprador",
      "admin",
      "comprador"
    ]

    let emails:string[] = [
      "mail1@gmail.com",
      "mail2@gmail.com",
      "mail3@gmail.com",
      "mail4@gmail.com"
    ]

    let status:string[] =[
      "solter",
      "casat",
      "solter",
      "divorciat"
    ]

    let genders:string[] =[
      "home",
      "dona",
      "altres",
      "dona"
    ]

    let interests:string[] =[
      "videojocs",
      "comics",
      "futbol",
      "tennis"
    ]

    let conditions:any[] =[
      true, false, false, true
    ]
    // let listEvents;

    // Bucle para crear arrays de manera aleatória 50 usuarios
    for(let j=0;j<100;j++){
      let i = Math.floor(Math.random()*4);
      this.listUsers.push(new User(usernames[i], passwords[i], roles[i],emails[i], status[i], genders[i],interests[i], conditions[i]))
    }

    // Devuelve lista de usuarios
    return this.listUsers;
  }

  /**
   * @description Per obtenir el role
   * @version 1.2
   * @author Siddique Muhamamd
   * @param {any} username -  The Username
   * @param {any} password - The Password
   * @return {string} role
  */
  dologin(username:any,password:any): string{
    for (let i = 0; i < this.listUsers.length; i++) {
      if (this.listUsers[i].username == username && this.listUsers[i].password == password) {
          this.role = this.listUsers[i].role;
          break;
      }else{
        this.role = '';
      }
    }
    return this.role;
  }

  // Login role and current role
  private loginRole = new BehaviorSubject(this.login);
  public current_login_role = this.loginRole.asObservable();

  
  /**
   * @description change login mode
   * @version 1.2
   * @author Siddique Muhamamd
   * @param {boolean} log -  Logged or not
  */
  changelogs(log:boolean){
    this.loginRole.next(log);
  }

  
  
}
