/**
   * @file Check Login guard. Manages the login entry guard
   * @version 1.2
   * @author Siddique Muhammad
*/

// Imports
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersServicesService } from '../services/users-services.service';

@Injectable({
  providedIn: 'root'
})

// More information about guards
//https://codingpotions.com/angular-seguridad

// To create a guard: ng g guard guards/nom_guard --implements CanActivate


// Class CheckLoginGuard implements CanActivate
export class CheckLoginGuard implements CanActivate {

  // Constructor
  constructor(private route:Router, private http: UsersServicesService){

  }

  // Can Activate method
  /**
   * @description Activate the guard 
   * @param route
   * @version 1.2
   * @author Siddique Muhammad
  */
  canActivate(route: ActivatedRouteSnapshot) {
    const usuario=this.http.usuariData();
    //console.log("erererer",usuario);
    if(usuario!=null){

      return true;
    } 
      this.route.navigate(['login']);
      console.log("Please login")
      return false;
  }

  
}
