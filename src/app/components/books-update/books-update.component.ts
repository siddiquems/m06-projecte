/**
   * @file Books update component ts. Typescript file
   * @description updates a book with the latest data in the form
   * @version 1.2
   * @author Siddique Muhammad
*/

// Imports
import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudServicesService } from 'src/app/services/crud-services.service';

@Component({
  selector: 'app-books-update',
  templateUrl: './books-update.component.html',
  styleUrls: ['./books-update.component.css']
})

// Class BooksUpdateComponent
export class BooksUpdateComponent implements OnInit {

  getId : any;
  updateForm : any;
  dataArray : any;

  // Constructor
  constructor(
    public formBuiler: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudServicesService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudService.getBook(this.getId).subscribe(
      res => {
        this.dataArray = res as string[];
        console.log(res['data']);
        // console.log(this.getId)

        // Get current data in the form
        this.updateForm.patchValue({
          name: res['data']['name'],
          description: res['data']['description'],
          price: res['data']['price']
        });

      });

      // We can build the form if we don't want to validate the form data:
      // this.updateForm = this.formBuiler.group({
      //   name: ['name'],
      //   description: ['description'],
      //   price: ['pricee']
      // })

      // Create the form with validators
      this.updateForm = new FormGroup({
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
    
  // NgOnInit
  ngOnInit(): void {
    
  }
  
  /**
   * @description on press the update button, updates the selected book with the current data
   * - NgZone: ngZone.runOutsideAngular() - this runs the code outside the angular zone.
   * - When some event is fired it tells angular to detect changes.
   * - we can run it outside of angular zone, If we don't want these changes to take place run-time in angular (which reduces performance of the app).
   */
  onUpdate():any {

    this.crudService.updateBook(this.getId, this.updateForm.value).subscribe(
      (res) => {
        // For tests
        console.log(this.getId);
        console.log(this.updateForm.value);
        console.log("Book updated successfully");

        // Navigate to the list
        this.ngZone.run(() => this.router.navigateByUrl('/books-list'));
      }
    )
  }
}
