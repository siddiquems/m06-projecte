import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksAddComponent } from './components/books-add/books-add.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BooksUpdateComponent } from './components/books-update/books-update.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MotivationComponent } from './components/motivation/motivation.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { RegisterComponent } from './components/register/register.component';


// Routes we have in the website
const routes: Routes = [
  {
    path:'',
    redirectTo:'/',
    pathMatch:'full'
  },
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'presentation',
    component: PresentationComponent
  },
  {
    path:'motivation',
    component: MotivationComponent
  },
  {
    path:'contact',
    component: ContactComponent
  },
  {
    path:'login',
    component: LoginComponent 
  },
  {
    path:'register',
    component: RegisterComponent 
  },
  {
    path:'books-list',
    component: BooksListComponent
  },
  {
    path:'books-add',
    component: BooksAddComponent
  },
  {
    path:'books-update/:id',
    component: BooksUpdateComponent
  },
  {
    path:'**',
    component:PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
