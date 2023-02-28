/**
   * @file App routing module. Manages all the routes
   * @version 1.2
   * @author Siddique Muhammad
*/

// Import angular modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import components
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
import { CheckLoginGuard } from './guards/check-login.guard';


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
    component: LoginComponent,
  },
  {
    path:'register',
    component: RegisterComponent,
  },
  {
    path:'books-list',
    component: BooksListComponent,
    canActivate:[CheckLoginGuard]
  },
  {
    path:'books-add',
    component: BooksAddComponent,
    canActivate:[CheckLoginGuard]

  },
  {
    path:'books-update/:id',
    component: BooksUpdateComponent,
    canActivate:[CheckLoginGuard]

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
