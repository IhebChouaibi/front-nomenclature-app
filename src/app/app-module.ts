import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './component/pages/login/login';
import { TextField } from './component/text-field/text-field';
import {  HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { Navbar } from './component/navbar/navbar';
import { Home } from './component/pages/home/home';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authInterceptor } from './interceptors/auth-interceptor';
import { PopUp } from './component/pop-up/pop-up';
import { Info } from './component/info/info';
import { MatDialogModule } from '@angular/material/dialog';
import { Sidebar } from './component/pages/sidebar/sidebar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Exportdata } from './component/exportdata/exportdata';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { Footer } from './component/footer/footer';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {  MatIconModule } from '@angular/material/icon';
import {  MatDividerModule } from '@angular/material/divider';
import { AddNomenclature } from './component/add-nomenclature/add-nomenclature';
import { MatSelectModule } from '@angular/material/select';
import { SearchResults } from './component/pages/search-results/search-results';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Add } from './component/add/add';
import { AddNotes } from './component/add-notes/add-notes';
import { MatNativeDateModule, MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import {  MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { errorInterceptor } from './interceptors/error-interceptor';
import { TaricFullDetails } from './component/pages/taric-full-details/taric-full-details';
import { AddMesure } from './component/pages/add-mesure/add-mesure';

@NgModule({
  declarations: [

    App,
    Login,
    Home,
    TextField,
    Navbar,
    PopUp,
    Info,
    Sidebar,
    Exportdata,
    Footer,
    AddNomenclature,
    SearchResults,
    Add,
    AddNotes,
    Footer,
    TaricFullDetails,
    AddMesure
   
    
 
  ],
  imports: [
    AppRoutingModule,
    NgxDropzoneModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatDividerModule,
    MatOptionModule,
    MatDatepickerModule,
    MatIconModule,
    MatSelectModule  ,
    MatDatepickerModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatMenuModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
     provideHttpClient(),
  provideHttpClient(withInterceptors([authInterceptor , errorInterceptor])),
  provideNativeDateAdapter(),
  
  ],
  bootstrap: [App]
})
export class AppModule { }
