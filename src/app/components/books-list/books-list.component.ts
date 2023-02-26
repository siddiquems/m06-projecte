import { Component, OnInit } from '@angular/core';
import { CrudServicesService } from 'src/app/services/crud-services.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  Books:any = [];
  constructor(private crudeService: CrudServicesService) { }

  ngOnInit(): void {
    this.crudeService.getBooks().subscribe(res => {
      console.log(res);
      this.Books = res;
    })
  }

  delete(id: string, i:any) {
    console.log(id, i);
    if(window.confirm('Do you want to go ahead?')) {
      this.crudeService.deleteBook(id).subscribe(res => {
        this.Books.splice(i, 1);
      })
    }
  }

}
