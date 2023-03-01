/**
   * @file menus component ts. Typescript file
   * @version 1.2
   * @author Siddique Muhammad
*/

// Imports
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UsersServicesService } from 'src/app/services/users-services.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})


// Class Menus Component
export class MenusComponent {
  usuario!:User;

  // COnstructor
  constructor(public http:UsersServicesService, private route: Router){
    this.http.usuario.subscribe(
      resultat =>{
        this.usuario = resultat;
        console.log('cambio el objeto '+ this.usuario);
      }
    )
}

/**
   * @description logout. Performs logout and naviagates to the login page
   * @version 1.2
   * @author Siddique Muhammad
*/
  logout(){
    this.http.logout();
    this.route.navigate(['/login']);
  }
}
