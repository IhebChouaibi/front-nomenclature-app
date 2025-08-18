import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './component/pages/login/login';
import { Home } from './component/pages/home/home';
import { adminGuard } from './guards/admin-guard';
import { SearchResults } from './component/pages/search-results/search-results';
import { authReverseGuard } from './guards/auth-reverse-guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'login', component: Login , canActivate: [authReverseGuard]},
  { path: 'home', component: Home, canActivate: [adminGuard] ,   },
   { path: 'search', component: SearchResults },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
