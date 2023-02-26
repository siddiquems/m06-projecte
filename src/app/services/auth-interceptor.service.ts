import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router
  ) {}
  
  // el intercept lo que hace es lo de Header authorization bearer token
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Recojo el token almacenado en el momento del login
    const token = localStorage.getItem('token');

    let request = req;

    // Lo envía casa vez que s ehaga una validación
    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
    }

    // return next.handle(request);
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          this.router.navigateByUrl('/login');
        }
        // Devuelve el error
        return throwError( err );
      })
    );

  }

}

// Més info
// https://medium.com/@insomniocode/angular-autenticación-usando-interceptors-a26c167270f4
