/**
   * @file Typescript file. Component Login
   * @version 1.2
   * @author Siddique Muhammad
*/

// Imports
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UsersServicesService } from 'src/app/services/users-services.service';
import { Router } from '@angular/router';


// Component login
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

// Class LoginComponent
export class LoginComponent {

  user!:User;
  data:any;

  // Not logged yet
  login : boolean = false;

  // Constructor
  constructor(private serviceUsers:UsersServicesService, private router:Router){
    this.serviceUsers.createUsers();
    console.log(this.serviceUsers.listUsers);
  }

  // Login Form
  loginForm = new FormGroup({
    username:new FormControl("",[Validators.required]),
    password:new FormControl("",[Validators.required])
  });


  /**
   * @description submit data
   * @version 1.2
   * @author Siddique Muhamamd
  */  
  submit(){

    let user_role = this.serviceUsers.dologin(this.loginForm.value.username, this.loginForm.value.password);
    console.log(user_role);

    this.serviceUsers.current_login_role.subscribe(log=>this.login=log);

    // Si la variable user_role es diferente de "" vacío
    if(user_role!=""){
      let log = true;
      this.serviceUsers.changelogs(log);

      // Set cookies and localstorage
      // this.cookieService.set("user",this.loginForm.value.username+" "+user_role);
      // localStorage.setItem('usuario', JSON.stringify(this.loginForm.value.username));
      // // localStorage.setItem('usuario_role', JSON.stringify(user_role));
      // localStorage.setItem('user_role', user_role);

      // this.router.navigate(['/listEvents']).then(()=>window.location.reload());

      // this.serviceUsers.changeRol(user_role);

      // this.serviceUsers.changelogs(log)
      this.data = "Correct credentials"
    } else {
      this.data = "Incorrect credentials"
    }
  };
}
