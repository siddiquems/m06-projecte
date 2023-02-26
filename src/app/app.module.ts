import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './components/contact/contact.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { MotivationComponent } from './components/motivation/motivation.component';
import { MenusComponent } from './components/menus/menus.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { AuthInterceptorService } from './services/auth-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BooksAddComponent } from './components/books-add/books-add.component';
import { BooksUpdateComponent } from './components/books-update/books-update.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    PresentationComponent,
    MotivationComponent,
    MenusComponent,
    LoginComponent,
    PageNotFoundComponent,
    RegisterComponent,
    HomeComponent,
    BooksListComponent,
    BooksAddComponent,
    BooksUpdateComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
