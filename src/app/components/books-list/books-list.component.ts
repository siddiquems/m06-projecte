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

  ngOnInit(): void {
    this.crudeService.getBooks().subscribe(res => {
      console.log(res);
      this.Books = res;
    })
  }

  delete(id: string) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.crudeService.deleteBook(id).subscribe(
        res => {
          console.log('ok')
          // this.route.navigate(['/books-list']);
          location.reload();

          // this.Books.splice(i, 1);
        }
      )
    }
  }

}
