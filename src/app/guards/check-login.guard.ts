import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersServicesService } from '../services/users-services.service';

@Injectable({
  providedIn: 'root'
})

export class CheckLoginGuard implements CanActivate {

  constructor(private route:Router, private http: UsersServicesService){ }
    canActivate(
    route: ActivatedRouteSnapshot) {

    const usuario=this.http.usuariData();
    //console.log("erererer",usuario);
    if(usuario!=null){

      return true;
    } 
      this.route.navigate(['/']);
      return false;  
    }
  
}
