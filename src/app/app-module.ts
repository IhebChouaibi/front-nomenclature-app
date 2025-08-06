import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './component/pages/login/login';
import { TextField } from './component/text-field/text-field';
import {  HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { Navbar } from './component/navbar/navbar';
import { Home } from './component/pages/home/home';
import { FormsModule } from '@angular/forms';
import { authInterceptor } from './interceptors/auth-interceptor';


@NgModule({
  declarations: [

    App,
    Login,
    Home,
    TextField,
    Navbar
    
   
    
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  
     FormsModule,    
     
 
   

  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
     provideHttpClient(),
  provideHttpClient(withInterceptors([authInterceptor]))
  ],
  bootstrap: [App]
})
export class AppModule { }
