import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudServicesService } from 'src/app/services/crud-services.service';

@Component({
  selector: 'app-books-update',
  templateUrl: './books-update.component.html',
  styleUrls: ['./books-update.component.css']
})
export class BooksUpdateComponent implements OnInit {

  getId : any;
  updateForm : any;
  dataArray : any;

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
        // this.dataArray = res as string[];
        console.log(res);

        this.updateForm.patchValue({
          name: res['name'],
          description: res['description'],
          price: res['price']
        });

      });
      this.updateForm = this.formBuiler.group({
        name: ['name'],
        description: ['description'],
        price: ['price']
      })
    }
    
  ngOnInit(): void {
    
  }

  onUpdate():any {
    this.crudService.updateBook(this.getId, this.updateForm.value).subscribe(
      (results) => {
        console.log("Book updated successfully");
        this.ngZone.run(() => this.router.navigateByUrl('/books-list'));
      }
    )
  }
}
