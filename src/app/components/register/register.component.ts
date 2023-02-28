/**
   * @file Typescript file. Component Register
   * @version 1.2
   * @author Siddique Muhammad
*/

// Imports
import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UsersServicesService } from 'src/app/services/users-services.service';

// Component register
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

// Class Register Component
export class RegisterComponent {
  constructor(private userService: UsersServicesService, private router: Router){
  }

  user!:User;
  data:any;


  // Register Form
  registerForm = new FormGroup({
    username:new FormControl('',[Validators.required, Validators.minLength(4), Validators.pattern('[A-Za-zñÑáéíóúÁÉÍÓÚ ]+')]),
    password:new FormControl('',[Validators.required, Validators.minLength(8)]),

  });


  /**
   * @description submit data and push User object after registration
   * @version 1.2
   * @author Siddique Muhamamd
  */    
  submit(){
    this.userService.registerUser(this.registerForm.value.username, this.registerForm.value.password).subscribe(
      result => {
        if(result==null){
          this.data='please, enter data';
          console.log('register fail'); 
        }else{
          this.user=JSON.parse(JSON.stringify(result))
          this.router.navigate(['/login']);
          console.log('register ok'); 
        }
      }
    )
  }
}
