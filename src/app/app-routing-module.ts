import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './component/pages/login/login';
import { Home } from './component/pages/home/home';
import { adminGuard } from './guards/admin-guard';
import { SearchResults } from './component/pages/search-results/search-results';
import { authReverseGuard } from './guards/auth-reverse-guard';
import { TaricFullDetails } from './component/pages/taric-full-details/taric-full-details';
import { AddMesure } from './component/pages/add-mesure/add-mesure';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'login', component: Login , canActivate: [authReverseGuard]},
  { path: 'home', component: Home, canActivate: [adminGuard] ,   },
   { path: 'search', component: SearchResults },
   {path:'taric-info/:id', component : TaricFullDetails},
   {path : 'add-mesure', component :AddMesure}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
