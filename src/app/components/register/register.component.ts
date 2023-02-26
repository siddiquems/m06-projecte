/**
   * @file Typescript file. Component Register
   * @version 1.2
   * @author Siddique Muhammad
*/

// Imports
import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
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
  constructor(private userService: UsersServicesService){
  }

  user!:User;
  data:any;

  // Create arrays of data
  estado = ["Casat/da","Solter/a","Divorciat/da"]
  interest = ["Videojuego","Accesoris","Novetats del mercat"]

  // Register Form
  registerForm = new FormGroup({
    username:new FormControl('',[Validators.required, Validators.minLength(6), Validators.pattern('[A-Za-zñÑáéíóúÁÉÍÓÚ ]+')]),
    password:new FormControl('',[Validators.required, Validators.minLength(8)]),
    repeatPassword:new FormControl('',[Validators.required, Validators.minLength(8)]),
    email:new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    gender:new FormControl('',[Validators.required]),
    status:new FormControl('',[Validators.required]),
    interests:new FormControl(''),
    conditions:new FormControl('',[Validators.required])

  });


  /**
   * @description submit data and push User object after registration
   * @version 1.2
   * @author Siddique Muhamamd
  */    
  submit(){
    this.user = new User(
      this.registerForm.value.username, 
      this.registerForm.value.password,
      'comprador', 
      this.registerForm.value.email, 
      this.registerForm.value.gender, 
      this.registerForm.value.status,
      this.registerForm.value.interests,
      this.registerForm.value.conditions);
      console.log(this.user);

      // Push user with the function getUsers
    this.userService.getUsers(this.user)

    this.data="Usuari registrat correctament.";
  }
}
