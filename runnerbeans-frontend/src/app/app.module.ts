import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routes } from './app.router';
import { FileSelectDirective } from 'ng2-file-upload';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { AuthGuard } from './services/authguard.services';
import { AuthService } from './services/auth.services';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { Services } from './services/services.component';
import { SignupComponent } from './signup/signup.component';
import { WallComponent } from './wall/wall.component';
import { AccountComponent } from './account/account.component';
import { SportComponent } from './sport/sport.component';


@NgModule({
  declarations: [
    //pages would be added here
    AppComponent,
    AboutComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    WallComponent,
    FileSelectDirective,
    AccountComponent,
    SportComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    FormsModule,
    routes,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAUIX8xD9U_R4AhXmWful7s2ZW5C4QmrNY'
    })
  ],
  providers: [
    Services,
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
