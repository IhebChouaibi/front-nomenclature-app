import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './component/pages/login/login';
import { Home } from './component/pages/home/home';
import { adminGuard } from './guards/admin-guard';
import { Navbar } from './component/navbar/navbar';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'login', component: Login },
  { path: 'home', component: Navbar, canActivate: [adminGuard]  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
