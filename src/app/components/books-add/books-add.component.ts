import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudServicesService } from 'src/app/services/crud-services.service';

@Component({
  selector: 'app-books-add',
  templateUrl: './books-add.component.html',
  styleUrls: ['./books-add.component.css']
})
export class BooksAddComponent implements OnInit {
  bookForm : FormGroup;
  data : any;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudServicesService
  ) { 
    this.bookForm = this.formBuilder.group({
      name: [''],
      description: [''],
      price: [''],
    })
  }
  ngOnInit() { }
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
