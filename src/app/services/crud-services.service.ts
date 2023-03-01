/**
   * @file Crud service. 
   * @description Service that provides all the functionality in crud service
   * @version 1.2
   * @author Siddique Muhammad
*/

// Imports
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../models/Book';


@Injectable({
  providedIn: 'root'
})
export class CrudServicesService {

  // Node / Express API
  // URL in the server
  url : string = 'http://localhost:3000';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  // Constructor
  constructor(private httpClient: HttpClient) { }

  // Get all objects
  getBooks() {
    return this.httpClient.get(`${this.url}/books`);
  }

  // Get a single book object

  // Get single object
   /**
   * @description gets a single book object
   * @param id the book identifier
   * @returns response and Observable object
   */
  getBook(id:any): Observable<any> {

    // Url
    let url_book = `${this.url}/read-book/${id}`;

    return this.httpClient.get(url_book, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }
  // Add
  /**
   * @description adds a new book
   * @param data the book data
   * @returns response and Observable object
   */
  addBook(data: Book): Observable<any> {
    console.log(data);
    let url_add = `${this.url}/add-book`;
    return this.httpClient.post<Observable<any>>(url_add, data);
      
  }

  // Update
  /**
   * @description upddates a book
   * @param id the book identifier
   * @returns response and Observable object
   */
  updateBook(id:any, data:any): Observable<any> {
    // console.log(data);
    let url_update = `${this.url}/update-book/${id}`;
    return this.httpClient.put(url_update, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Delete
  /**
   * @description deletes a book from the database
   * @param id the book identifier
   * @returns response and Observable object
   */
  deleteBook(id:any): Observable<any> {
    let url_delete = `${this.url}/delete-book/${id}`;
    console.log(id)
    return this.httpClient.delete(url_delete, { headers: this.httpHeaders})
      .pipe(
        catchError(this.handleError)
      )
  }
  

  // Error 
  /**
   * @description to handle error
   * @param error HttpErrorResponse 
   * @returns message
   */
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  
}
