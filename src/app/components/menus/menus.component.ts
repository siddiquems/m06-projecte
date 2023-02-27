import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User_full';
import { UsersServicesService } from 'src/app/services/users-services.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent {
  usuario!:User;

  constructor(public http:UsersServicesService, private route: Router){
    this.http.usuario.subscribe(
      resultat =>{
        this.usuario = resultat;
        console.log('cambio el objeto '+ this.usuario);
      }
    )
   
}

  logout(){
    this.http.logout();
    this.route.navigate(['/']);
  }
}
