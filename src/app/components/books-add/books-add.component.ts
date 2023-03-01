/**
   * @file Books add component ts. Typescript file
   * @description adds a book with the data in the form
   * @version 1.2
   * @author Siddique Muhammad
*/

// Imports
import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudServicesService } from 'src/app/services/crud-services.service';

@Component({
  selector: 'app-books-add',
  templateUrl: './books-add.component.html',
  styleUrls: ['./books-add.component.css']
})
export class BooksAddComponent implements OnInit {
  bookForm!: FormGroup;
  data : any;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudServicesService
  ) { 
    // this.bookForm = this.formBuilder.group({
    //   name: [''],
    //   description: [''],
    //   price: [''],
    // })
  }
  ngOnInit() { 

    // Create the form group with validators
    this.bookForm = new FormGroup({
      name: new FormControl ('',[
        Validators.required,
        Validators.minLength(2)
      ]),
      description: new FormControl ('',[
        Validators.required,
        Validators.minLength(5)
      ]),
      price: new FormControl ('',[
        Validators.required,
        Validators.minLength(1),
        Validators.pattern('[0-9]+')
      ]),
    });
  }

  /**
   * @description adds a new book in the database when the user press the submit button
   * If the book is added, redirects to the books table
   */
  onSubmit(): any {
    console.log(name);
    this.crudService.addBook(this.bookForm.value).subscribe( 
    
      (results)=>  {
        console.log('Book added successfully!')
        this.router.navigateByUrl('/books-list')
      }, 
      (err) => {
        console.log(err);
        this.data = "No data found";
    });
  }
}
