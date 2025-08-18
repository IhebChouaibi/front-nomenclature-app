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
import { M } from '@angular/cdk/keycodes';
import { MatDialogModule } from '@angular/material/dialog';
import { Sidebar } from './component/pages/sidebar/sidebar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { Exportdata } from './component/exportdata/exportdata';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { Footer } from './component/footer/footer';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { AddNomenclature } from './component/add-nomenclature/add-nomenclature';
import { MatMenu } from '@angular/material/menu';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { SearchResults } from './component/pages/search-results/search-results';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { Add } from './component/add/add';
import { AddNotes } from './component/add-notes/add-notes';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatCheckbox } from '@angular/material/checkbox';
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
    AddNotes
    
   
    
 
  ],
  imports: [
      AppRoutingModule,

 BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    NgxDropzoneModule,
    MatProgressBarModule,
    MatIcon,
    MatDivider,
    MatMenu,
    MatOption,
    MatDatepicker,
     
    MatSelectModule  ,
     MatDatepickerModule,
     MatPaginator,
         MatNativeDateModule,
MatSnackBarModule,
MatCheckbox
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
     provideHttpClient(),
  provideHttpClient(withInterceptors([authInterceptor])),
  provideNativeDateAdapter(),
  
  ],
  bootstrap: [App]
})
export class AppModule { }
