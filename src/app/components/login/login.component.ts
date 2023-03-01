/**
   * @file login component ts. Typescript file
   * @version 1.2
   * @author Siddique Muhammad
*/

// Imports
import { Component, OnInit } from '@angular/core';
 
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UsersServicesService } from 'src/app/services/users-services.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })

// Class LoginComponent
export class LoginComponent implements OnInit {
  
  // Definitions
  login!:User;
  message!:string;
  user!:User;
  loginForm!:FormGroup;
  data:any;
 
  
  // Constructor
  constructor(private myHttpService: UsersServicesService, private route: Router, private formBuilder:FormBuilder ) { 
    this.user=new User("","","","","");
    this.login=new User("","","","","");
    this.message="";
    if(this.myHttpService.usuariData()){
      this.route.navigate(['/']);
    }
  }

  // NgOnInit
  ngOnInit(): void {
    this.login = new User("","","","","");

    // Login Form Group
    this.loginForm = new FormGroup({
      
      // Username validators
      username: new FormControl('',[
        Validators.required, 
        Validators.minLength(4), 
        Validators.maxLength(20)
  
      ]),

      // Password validators
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(5)]
      )
    });
  }


  /**
   * @description performs login validation
   * validates with the method defined in the users service
   */
  testLogin():void{
    //login
    
    this.myHttpService.validatingLogin(this.loginForm.value).subscribe(
      result => {
        if(result==null){
          this.message="Credencials incorrectes";
        }else{
          this.user=JSON.parse(JSON.stringify(result));
          this.route.navigate(['/']);
        }
      }
     );
  }
}

