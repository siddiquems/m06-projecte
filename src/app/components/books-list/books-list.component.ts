/**
   * @file Books list component ts. Typescript file
   * @description list all the book stored in the database
   * @version 1.2
   * @author Siddique Muhammad
*/

// Imports
import { Component, OnInit } from '@angular/core';
import { CrudServicesService } from 'src/app/services/crud-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  Books:any = [];
  constructor(private crudeService: CrudServicesService, private route: Router) { }

  // NgOnInit()
  ngOnInit(): void {
    this.crudeService.getBooks().subscribe(res => {
      console.log(res);
      this.Books = res;
    })
  }
  /**
   * @description deletes a book if the user press the delete button
   * It will ask a confirmation with a window confirmation
   * @param id the book id
   */
  delete(id: string) {
    console.log(id);
    // If window confirmation is true:
    if(window.confirm('Do you want to go ahead?')) {
      this.crudeService.deleteBook(id).subscribe(
        res => {
          console.log('ok')
          // Reload to apply changes in the table
          // this.route.navigate(['/books-list'])
          location.reload();
        }
      )
    }
  }

}
